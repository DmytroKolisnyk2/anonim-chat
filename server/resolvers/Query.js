const version = () => "1.1.0";

const posts = async (_parent, args, context, _info) => {
  const { filter, skip, take, orderBy } = args;
  const where = filter ? { text: filter } : {};

  const foundPosts = await context.prisma.post.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await context.prisma.post.count();

  return {
    postList: foundPosts,
    count,
  };
};

module.exports = { posts, version };
