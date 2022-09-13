import { Response, NextFunction, Request } from 'express';
import tweetErrors from './errorMessages/tweetErrorMessages';

const tweetValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { tweet } = req.body;
  if (!tweet || tweet.length === 0) return res.status(404).json(tweetErrors.tweetError);
  return next();
};

const likeSignValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { likeSign } = req.body;
  const availableSigns = ['+', '-'];
  const isValidSign = availableSigns.includes(likeSign);

  if (!likeSign || isValidSign === false) return res.status(404).json(tweetErrors.signError);
  return next();
};

export { tweetValidation, likeSignValidation };
