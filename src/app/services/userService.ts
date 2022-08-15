const bcrypt = require('bcrypt');
const { User } = require('../../database/models');

type UserBodyRequest = {
    name: string,
    email: string,
    password: string
}

const postUser = async (body: UserBodyRequest) => {
  const { email, name, password } = body;
  const findUserByEmail = await User.findOne({
    where: { email },
  });

  if (findUserByEmail) {
    return { status: 404, data: { message: 'E-mail já cadastrado' } };
  }
  const saltRounds = 10;
  const hasPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({
    name, email, password: hasPassword,
  });
  return { status: 201, data: newUser };
};

export { postUser };
