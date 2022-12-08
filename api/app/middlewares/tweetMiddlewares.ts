import { Response, NextFunction, Request } from 'express';
import tweetErrors from './errorMessages/tweetErrorMessages';

const tweetValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { tweet } = req.body;
  if (!tweet || tweet.length === 0) return res.status(404).json(tweetErrors.tweetError);
  return next();
};

export default tweetValidation;
