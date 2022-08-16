const { Tweet } = require('../../database/models');

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

export { postTweet };
