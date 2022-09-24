const createPost = async (_parent, args, context) => {
  const newPost = await context.prisma.post.create({ data: args.post });
  context.pubsub.publish("NEW_POST", newPost);
  return newPost;
};

const addLike = async (_parent, args, context) => {
  const likedPost = await context.prisma.post.update({
    where: { id: args.id },
    data: { like: { increment: 1 } },
  });
  context.pubsub.publish("NEW_LIKE", likedPost);
  return likedPost;
};
const addDislike = async (_parent, args, context) => {
  const dislikedPost = await context.prisma.post.update({
    where: { id: args.id },
    data: { dislike: { increment: 1 } },
  });
  context.pubsub.publish("NEW_DISLIKE", dislikedPost);
  return dislikedPost;
};

module.exports = { createPost, addLike, addDislike };
