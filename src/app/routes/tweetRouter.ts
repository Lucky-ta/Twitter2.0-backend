import { Router } from 'express';
import {
  createTweet,
  editTweetById,
  excludeTweet,
  getTweets,

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

tweetRouter.get('/', getTweets);

tweetRouter.put(
  '/:id',
  tokenValidation,
  userActionValidation,
  tweetValidation,

  editTweetById,
);

tweetRouter.delete(
  '/:id',
  tokenValidation,
  userActionValidation,

  excludeTweet,
);

export default tweetRouter;
