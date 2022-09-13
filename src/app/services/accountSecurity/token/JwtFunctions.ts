import jwt from 'jsonwebtoken';
import { DataValuesShape } from '../../types/servicesTypes';

const signToken = (dbDataValues: DataValuesShape, secret: any) => {
  const { password: passDb, ...userWithouPassword } = dbDataValues;

  const token: string = jwt.sign(userWithouPassword, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

export default signToken;
