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
  if (createTweet !== null) {
    return { status: 201, data: createTweet };
  } return { status: 404, data: { message: 'Erro ao criar tweet' } };
};

const getAllTweets = async () => {
  const allTweets = await Tweet.findAll({
    attributes: ['tweet', 'id', 'likes'],
    include: [
      { model: User, required: true, attributes: ['name', 'id'] },
    ],
  });

  if (allTweets !== null) {
    return { status: 201, data: allTweets };
  } return { status: 404, data: { message: 'Erro ao pegar tweets' } };
};

const destroyTweet = async (tweetId: number) => {
  const deleteTweet = await Tweet.destroy({ where: { id: tweetId } });

  if (deleteTweet !== null) {
    return { status: 200 };
  } return { status: 404 };
};

const getUserTweets = async (userId: number) => {
  const userTweets = await Tweet.findAll({ where: { userId } });

  if (userTweets !== null) {
    return { status: 200, data: userTweets };
  } return { status: 400, data: { message: 'User not found' } };
};

const editTweet = async (tweetId: number, newTweet: string) => {
  const editedTweet = await Tweet.update(
    { tweet: newTweet },
    { where: { id: tweetId } },
  );

  if (editedTweet !== null) {
    return { status: 200, data: editedTweet };
  } return { status: 400, data: { message: 'Tweet not found' } };
};

const updateTweetLike = async (tweetId: number, likeSign: string) => {
  const currentTweet = await Tweet.findByPk(tweetId);

  if (likeSign === '+') {
    const sumTweetLikes = await Tweet.update(
      { likes: currentTweet.dataValues.likes + 1 },
      { where: { id: tweetId } },
    );

    if (sumTweetLikes !== null) {
      return { status: 200, data: sumTweetLikes };
    } return { status: 404, data: { message: 'Tweet not found' } };
  }

  if (likeSign === '-') {
    const subtractTweetLikes = await Tweet.update(
      { likes: currentTweet.dataValues.likes - 1 },
      { where: { id: tweetId } },
    );

    if (subtractTweetLikes !== null) {
      return { status: 200, data: subtractTweetLikes };
    } return { status: 404, data: { message: 'Tweet not found' } };
  } return { status: 404, data: { message: 'Action not available' } };
};

export {
  postTweet,
  getAllTweets,
  destroyTweet,
  getUserTweets,
  editTweet,
  updateTweetLike,
};
