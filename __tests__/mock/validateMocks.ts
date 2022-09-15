import jwt from 'jsonwebtoken';

const tokenValidationMiddleware = (token: string, SECRET: string) => {
  if (!token) return { message: 'Token not found' };

  try {
    const userData: any = jwt.verify(token, SECRET);
    return userData;
  } catch (e: any) {
    return { message: e.message };
  }
};

export default tokenValidationMiddleware;
