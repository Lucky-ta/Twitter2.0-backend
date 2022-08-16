import { Router } from 'express';
import { createTweet } from '../controllers/tweetController';
import { tokenValidation, tweetValidation } from '../middlewares/tweetMiddlewares';

const tweetRouter = Router();

tweetRouter.post(
  '/create',
  tokenValidation,
  tweetValidation,

  createTweet,
);

export default tweetRouter;
