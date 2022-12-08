import { compare, hash } from 'bcrypt';
import { DataValuesShape } from '../../types/servicesTypes';

const passwordValidation = async (hashPassword: string, dbDataValues: DataValuesShape)
  : Promise<boolean> => {
  const isValidPassword = await compare(hashPassword, dbDataValues.password);
  return isValidPassword;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const response = await hash(password, saltRounds);
  return response;
};

export {
  passwordValidation,
  hashPassword,
};
