import { Router } from 'express';
import TweetController from '../controllers/tweetController';
import { tokenValidation, userActionValidation } from '../middlewares/tokenMiddleware';
import tweetValidation from '../middlewares/tweetMiddlewares';

const tweetRouter = Router();

tweetRouter.post(
  '/create/:userId',
  tokenValidation,
  userActionValidation,
  tweetValidation,

  TweetController.createTweet,
);

tweetRouter.get(
  '/',
  tokenValidation,
  TweetController.getTweets,
);
tweetRouter.get(
  '/:userId',
  tokenValidation,
  userActionValidation,
  TweetController.getTweetsByUserId,
);

tweetRouter.delete(
  '/:tweetId/:userId',
  tokenValidation,
  userActionValidation,

  TweetController.excludeTweet,
);

tweetRouter.post(
  '/like/:userId/:tweetId',
  tokenValidation,
  userActionValidation,

  TweetController.likeTweet,
);

export default tweetRouter;
