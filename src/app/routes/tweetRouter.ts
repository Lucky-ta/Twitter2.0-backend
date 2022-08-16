import { Router } from 'express';
import { createTweet, excludeTweet, getTweets } from '../controllers/tweetController';
import { tokenValidation, tweetValidation } from '../middlewares/tweetMiddlewares';

const tweetRouter = Router();

tweetRouter.post(
  '/create',
  tokenValidation,
  tweetValidation,

  createTweet,
);

tweetRouter.get('/', getTweets);

tweetRouter.delete('/:id', tokenValidation, excludeTweet);

export default tweetRouter;
