import tweetErrors from './errorMessages/tweetMessages';
import { validateResponse } from './userService';

const { Tweet, User } = require('../../database/models');

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
  const userTweets = await Tweet.findAll({ where: { userId } });
  return validateResponse(userTweets, tweetErrors.tweetError, 200);
};

export {
  postTweet,
  getAllTweets,
  destroyTweet,
  getUserTweetsById,
};
