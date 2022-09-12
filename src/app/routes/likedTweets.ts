import { Router } from 'express';
import { addLikedTweet, getLikedTweetsByUserId, RemoveLikedTweet } from '../controllers/likedTweetsController';
import { tokenValidation } from '../middlewares/tweetMiddlewares';

const likedTweetsRouter = Router();

likedTweetsRouter.post(
  '/:userId/:tweetId',
  tokenValidation,

  addLikedTweet,
);

likedTweetsRouter.get(
  '/:userId',
  tokenValidation,

  getLikedTweetsByUserId,
);

likedTweetsRouter.delete(
  '/:userId/:tweetId',
  tokenValidation,

  RemoveLikedTweet,
);

export default likedTweetsRouter;
