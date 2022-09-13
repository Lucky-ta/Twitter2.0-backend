import SECRET from '../secret';
import { hashPassword, passwordValidation } from './accountSecurity/bycrypt/bycryptFunctions';
import signToken from './accountSecurity/token/JwtFunctions';
import { UserBodyRequest } from './types/servicesTypes';

const { User } = require('../../database/models');

const validateResponse = (response: any, errorMessage: string, statusCode: number) => {
  if (response !== null) {
    return { status: statusCode, data: response };
  } return { status: 404, data: { message: errorMessage } };
};

const isUserInDb = async (email: string) => {
  const findUserByEmail = await User.findOne({
    where: { email },
  });

  if (findUserByEmail) {
    return true;
  } return false;
};

const postUser = async (body: UserBodyRequest) => {
  const { email, name, password } = body;
  const isUserRegistered = await isUserInDb(email);

  if (isUserRegistered) {
    return { status: 404, data: { message: 'E-mail já cadastrado' } };
  }

  const hasPassword = await hashPassword(password);
  const newUser = await User.create({
    name, email, password: hasPassword,
  });

  const { password: passDb, ...userWithouPassword } = newUser.dataValues;

  return validateResponse(userWithouPassword, 'Not created', 201);
};

const loginUserAccount = async (userCredentials: UserBodyRequest) => {
  const { email, password } = userCredentials;

  const existUser = await User.findOne({ where: { email } });
  if (existUser === null) {
    return { status: 404, data: { message: 'Invalid User' } };
  }

  const { dataValues } = existUser;
  const isValidPassword = await passwordValidation(password, dataValues);
  if (isValidPassword) {
    const token = signToken(dataValues, SECRET);
    return { status: 200, data: token };
  }
  return { status: 404, data: { message: 'Invalid password' } };
};

const excludeAccount = async (accountId: number) => {
  const deleteTweet = await User.destroy({ where: { id: accountId } });

  return validateResponse(deleteTweet, 'Delete error', 200);
};

const editName = async (userId: number, newName: string) => {
  const updateUserName = await User.update(
    { name: newName },
    { where: { id: userId } },
  );

  return validateResponse(updateUserName, 'User not found', 200);
};

export {
  postUser,
  loginUserAccount,
  excludeAccount,
  editName,
};
