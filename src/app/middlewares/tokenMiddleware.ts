import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SECRET from '../secret';
import validateErrors from './errorMessages/validateError';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const userData: any = jwt.verify(token, SECRET);
    req.userData = userData;
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
  return next();
};

const userActionValidation = (req: Request, res: Response, next: NextFunction) => {
  const userId: number = req.userData.id;
  const { id } = req.params;
  const parsedId: number = Number(id);

  if (userId !== parsedId) {
    return res.status(404).json(validateErrors.actionError);
  }
  return next();
};

export {
  tokenValidation,
  userActionValidation,
};
