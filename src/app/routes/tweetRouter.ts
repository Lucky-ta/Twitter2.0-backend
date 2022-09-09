import { Router } from 'express';
import {
  createTweet,
  editTweetById,
  excludeTweet,
  getTweets,
  getTweetsByUserId,
  likeTweet,
} from '../controllers/tweetController';
import { tokenValidation, tweetValidation } from '../middlewares/tweetMiddlewares';

const tweetRouter = Router();

tweetRouter.post(
  '/create',
  tokenValidation,
  tweetValidation,

  createTweet,
);

tweetRouter.get('/', getTweets);
tweetRouter.get('/:id', tokenValidation, getTweetsByUserId);

tweetRouter.put(
  '/:id',
  tokenValidation,
  tweetValidation,

  editTweetById,
);
tweetRouter.put('/like/:id', likeTweet);

tweetRouter.delete('/:id', tokenValidation, excludeTweet);

export default tweetRouter;
