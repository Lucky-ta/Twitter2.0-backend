import { compare, hash } from 'bcrypt';
import { DataValuesShape } from '../../types/servicesTypes';

const passwordValidation = async (password: string, dbDataValues: DataValuesShape)
  : Promise<boolean> => {
  const isValidPassword = await compare(password, dbDataValues.password);
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
