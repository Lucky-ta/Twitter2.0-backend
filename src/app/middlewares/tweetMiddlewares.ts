import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import SECRET from '../secret';
import tweetErrors from './errorMessages/tweetErrorMessages';

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

const tweetValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { tweet } = req.body;
  if (!tweet || tweet === '') return res.status(404).json(tweetErrors.tweetError);
  return next();
};

export { tokenValidation, tweetValidation };
