import tweetErrors from './errorMessages/tweetMessages';
import userErrors from './errorMessages/userMessages';
import { validateResponse } from './userService';

const { Tweet, User, LikedTweets } = require('../../database/models');

export type UserDataShape = {
  id: number,
  name: string,
  email: string,
  iat: number,
  exp: number,
}

const postTweet = async (userData: UserDataShape | undefined, tweet: string) => {
  const createTweet = await Tweet.create({ userId: userData?.id, tweet });
  return validateResponse(createTweet, 'Not created', 201);
};

const getAllTweets = async () => {
  const allTweets = await Tweet.findAll({
    attributes: ['tweet', 'id', 'likes'],
    include: [
      { model: User, required: true, attributes: ['name', 'id'] },
    ],
  });

  return validateResponse(allTweets, tweetErrors.tweetError, 200);
};

const destroyTweet = async (tweetId: number) => {
  const deleteTweet = await Tweet.destroy({ where: { id: tweetId } });

  return validateResponse(deleteTweet, tweetErrors.tweetError, 200);
};

const getUserTweetsById = async (userId: number) => {
  const userTweets = await Tweet.findAll({
    where: { userId },
    attributes: ['tweet', 'id', 'likes'],
    include: [
      { model: User, required: true, attributes: ['name', 'id'] },
    ],
  });
  return validateResponse(userTweets, tweetErrors.tweetError, 200);
};

const likeNewTweet = async (userId: number, tweetId: number) => {
  const isTweetLiked = await LikedTweets.findOne({ where: { userId } });

  if (isTweetLiked !== null) {
    const unlikeTweet = await LikedTweets.destroy({ where: { userId } });
    if (unlikeTweet !== null) {
      return { status: 200, data: { action: 'Unliked' } };
    } return { status: 404, data: userErrors.userError };
  }

  const likeTweet = await LikedTweets.create({ userId, tweetId });
  if (likeTweet !== null) {
    return { status: 200, data: { action: 'Liked' } };
  } return { status: 404, data: tweetErrors.tweetError };
};

export {
  postTweet,
  getAllTweets,
  destroyTweet,
  getUserTweetsById,
  likeNewTweet,
};
