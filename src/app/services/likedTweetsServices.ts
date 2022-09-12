const { LikedTweets, Tweet } = require('../../database/models');

const likeNewTweet = async (userId: number, tweetId: number) => {
  const likeTweet = await LikedTweets.create({ userId, tweetId });

  if (likeTweet !== null) {
    return { status: 201, data: likeNewTweet };
  } return { status: 404, data: { message: 'Create error' } };
};

const deslikeNewTweet = async (userId: number, tweetId: number) => {
  const likeTweet = await LikedTweets.destroy({ where: { userId, tweetId } });

  if (likeTweet !== null) {
    return { status: 200 };
  } return { status: 404 };
};

const listLikedTweets = async (userId: number) => {
  const likedTweets = await LikedTweets.findAll({
    where: { userId },
    include: [
      { model: Tweet, required: true, attributes: ['tweet'] },
    ],
  });

  if (likedTweets !== null) {
    return { status: 201, data: likedTweets };
  } return { status: 404, data: { message: 'Tweet not found' } };
};

export { likeNewTweet, deslikeNewTweet, listLikedTweets };
