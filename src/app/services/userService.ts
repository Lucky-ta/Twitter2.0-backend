import SECRET from '../secret';
import { hashPassword, passwordValidation } from './accountSecurity/bycrypt/bycryptFunctions';
import signToken from './accountSecurity/token/JwtFunctions';
import userErrors from './errorMessages/userMessages';
import { UserBodyRequest } from './types/servicesTypes';

const { User } = require('../../database/models');

export const validateResponse = (response: any, errorMessage: string, statusCode: number) => {
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
    return { status: 404, data: { message: userErrors.emailError } };
  }

  const hasPassword = await hashPassword(password);
  const newUser = await User.create({
    name, email, password: hasPassword,
  });

  const { password: passDb, ...userWithouPassword } = newUser.dataValues;

  return validateResponse(userWithouPassword, userErrors.userError, 201);
};

const loginUserAccount = async (userCredentials: UserBodyRequest) => {
  const { email, password } = userCredentials;

  const existUser = await User.findOne({ where: { email } });
  if (existUser === null) {
    return { status: 404, data: { message: userErrors.userError } };
  }

  const { dataValues } = existUser;
  const isValidPassword = await passwordValidation(password, dataValues);
  if (isValidPassword) {
    const token = signToken(dataValues, SECRET);
    return { status: 200, data: token };
  }
  return { status: 404, data: { message: userErrors.passwordError } };
};

const excludeAccount = async (accountId: number) => {
  const deleteTweet = await User.destroy({ where: { id: accountId } });

  return validateResponse(deleteTweet, userErrors.userError, 200);
};

const editName = async (userId: number, newName: string) => {
  const updateUserName = await User.update(
    { name: newName },
    { where: { id: userId } },
  );

  return validateResponse(updateUserName, userErrors.userError, 200);
};

export {
  postUser,
  loginUserAccount,
  excludeAccount,
  editName,
};
