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
    attributes: ['tweet'],
    include: [
      { model: User, required: true, attributes: ['name'] },
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

export { postTweet, getAllTweets, destroyTweet };
