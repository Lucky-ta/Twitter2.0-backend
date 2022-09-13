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
  return validateResponse(createTweet, 'Not created', 200);
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

const getUserTweets = async (userId: number) => {
  const userTweets = await Tweet.findAll({ where: { userId } });

  return validateResponse(userTweets, tweetErrors.tweetError, 200);
};

const editTweet = async (tweetId: number, newTweet: string) => {
  const editedTweet = await Tweet.update(
    { tweet: newTweet },
    { where: { id: tweetId } },
  );

  return validateResponse(editedTweet, tweetErrors.tweetError, 200);
};

const updateTweetLike = async (tweetId: number, likeSign: string) => {
  const currentTweet = await Tweet.findByPk(tweetId);

  if (likeSign === '+') {
    const sumTweetLikes = await Tweet.update(
      { likes: currentTweet.dataValues.likes + 1 },
      { where: { id: tweetId } },
    );

    return validateResponse(sumTweetLikes, tweetErrors.tweetError, 200);
  }

  if (likeSign === '-') {
    const subtractTweetLikes = await Tweet.update(
      { likes: currentTweet.dataValues.likes - 1 },
      { where: { id: tweetId } },
    );
    return validateResponse(subtractTweetLikes, tweetErrors.tweetError, 200);
  } return { status: 404, data: { message: 'Action not available' } };
};

const tweetsByTweetId = async (tweetId: number) => {
  const tweetsByTheirId = await Tweet.findAll({
    where: { id: tweetId },
    include: [
      { model: User, required: true, attributes: ['id', 'name'] },
    ],
  });

  return validateResponse(tweetsByTheirId, tweetErrors.tweetError, 200);
};

export {
  postTweet,
  getAllTweets,
  destroyTweet,
  getUserTweets,
  editTweet,
  updateTweetLike,
  tweetsByTweetId,
};
