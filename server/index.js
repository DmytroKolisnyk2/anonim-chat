const { createServer, createPubSub } = require("@graphql-yoga/node");
const { readFileSync } = require("fs");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");


const { PrismaClient } = require("./generated/prisma-client-js");

const typeDefs = readFileSync(require.resolve("./schema.graphql")).toString("utf-8");
const prisma = new PrismaClient();
const pubsub = createPubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

async function main() {
  const yogaApp = createServer({
    schema: {
      typeDefs,
      resolvers,
    },
    context: { prisma, pubsub },
    graphiql: {
      subscriptionsProtocol: "WS",
    },
  });

  const httpServer = await yogaApp.start();
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: yogaApp.getAddressInfo().endpoint,
  });

  useServer(
    {
      execute: (args) => args.rootValue.execute(args),
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yogaApp.getEnveloped(ctx);

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
