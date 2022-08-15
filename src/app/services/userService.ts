const { User } = require('../../database/models');

type UserBodyRequest = {
    name: string,
    email: string,
    password: string
}

const postUser = async (body: UserBodyRequest) => {
  const { email } = body;
  const findUserByEmail = await User.findOne({
    where: { email },
  });

  if (findUserByEmail) {
    return { status: 404, data: { message: 'E-mail já cadastrado' } };
  } const newUser = await User.create(body);
  return { status: 201, data: newUser };
};

export { postUser };
