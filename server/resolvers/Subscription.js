const newPostSubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_POST");
const newLikeSubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_LIKE");
const newDislikeSubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_DISLIKE");

const newPost = {
  subscribe: newPostSubscribe,
  resolve: (payload) => payload,
};
const newLike = {
  subscribe: newLikeSubscribe,
  resolve: (payload) => payload,
};
const newDislike = {
  subscribe: newDislikeSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newPost,
  newLike,
  newDislike,
};
