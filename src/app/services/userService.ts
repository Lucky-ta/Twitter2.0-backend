import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import SECRET from '../secret';

const { User } = require('../../database/models');

type UserBodyRequest = {
    name?: string,
    email: string,
    password: string
}

type DataValuesShape = {
  id: number,
  name: string,
  email: string,
  password: string
}

const passwordValidation = async (password: string, dbDataValues: DataValuesShape)
  : Promise<boolean> => {
  const isValidPassword = await compare(password, dbDataValues.password);
  return isValidPassword;
};

const signToken = (dbDataValues: DataValuesShape, secret: any) => {
  const { password: passDb, ...userWithouPassword } = dbDataValues;

  const token = jwt.sign(userWithouPassword, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
};

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
  const { password: passDb, ...userWithouPassword } = newUser;

  return { status: 201, data: userWithouPassword };
};

const loginUserAccount = async (userCredentials: UserBodyRequest) => {
  const { email, password } = userCredentials;

  const isValidUser = await User.findOne({ where: { email } });
  if (isValidUser === null) {
    return { status: 404, data: { message: 'Invalid User' } };
  }

  const { dataValues } = isValidUser;
  const isValidPassword = await passwordValidation(password, dataValues);
  if (isValidPassword) {
    const token = signToken(dataValues, SECRET);
    return { status: 200, data: token };
  }
  return { status: 404, data: { message: 'Invald password' } };
};

export { postUser, loginUserAccount };
