import { Router } from 'express';
import {
  createTweet,
  editTweetById,
  excludeTweet,
  getTweets,

  likeTweet,
} from '../controllers/tweetController';
import { tokenValidation, userActionValidation } from '../middlewares/tokenMiddleware';
import { likeSignValidation, tweetValidation } from '../middlewares/tweetMiddlewares';

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

tweetRouter.put(
  '/like/:id',
  tokenValidation,
  userActionValidation,
  likeSignValidation,

  likeTweet,
);

tweetRouter.delete(
  '/:id',
  tokenValidation,
  userActionValidation,

  excludeTweet,
);

export default tweetRouter;
