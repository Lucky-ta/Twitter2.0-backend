const { LikedTweets } = require('../../database/models');

const likeNewTweet = async (userId: number, tweetId: number) => {
  const likeTweet = await LikedTweets.create({ userId, tweetId });

  if (likeTweet !== null) {
    return { status: 201, data: likeNewTweet };
  } return { status: 404, data: { message: 'Create error' } };
};

const deslikeNewTweet = async () => {

};

export { likeNewTweet, deslikeNewTweet };
