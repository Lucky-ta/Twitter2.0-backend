import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET from '../secret';

const { User } = require('../../database/models');

type UserBodyRequest = {
    name?: string,
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
  const hasPassword = await hash(password, saltRounds);
  const newUser = await User.create({
    name, email, password: hasPassword,
  });
  return { status: 201, data: newUser };
};

const loginUserAccount = async (userCredentials: UserBodyRequest) => {
  const { email, password } = userCredentials;
  const isValidUser = await User.findOne({ where: { email } });

  if (isValidUser === null) {
    return { status: 404, data: { message: 'Invalid User' } };
  }

  const { dataValues } = isValidUser;
  const passwordValidation = await compare(password, dataValues.password);
  if (passwordValidation) {
    const { password: passDb, ...userWithouPassword } = dataValues;

    const token = jwt.sign(userWithouPassword, SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    return { status: 200, data: token };
  }
  return { status: 404, data: { message: 'Invald password' } };
};

export { postUser, loginUserAccount };
