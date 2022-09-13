import { Router } from 'express';
import {
  createTweet,
  excludeTweet,
  getTweets,
  getTweetsByUserId,

} from '../controllers/tweetController';
import { tokenValidation, userActionValidation } from '../middlewares/tokenMiddleware';
import { tweetValidation } from '../middlewares/tweetMiddlewares';

const tweetRouter = Router();

tweetRouter.post(
  '/create',
  tokenValidation,
  userActionValidation,
  tweetValidation,

  createTweet,
);

tweetRouter.get(
  '/',
  tokenValidation,
  userActionValidation,
  getTweets,
);
tweetRouter.get(
  '/',
  tokenValidation,
  userActionValidation,
  getTweetsByUserId,
);

tweetRouter.put(
  '/:id',
  tokenValidation,
  userActionValidation,
  tweetValidation,

);

tweetRouter.delete(
  '/:id',
  tokenValidation,
  userActionValidation,

  excludeTweet,
);

export default tweetRouter;
