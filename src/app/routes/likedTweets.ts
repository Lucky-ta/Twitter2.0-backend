import { Router } from 'express';
import { addLikedTweet } from '../controllers/likedTweetsController';

const likedTweetsRouter = Router();

likedTweetsRouter.post('/:userId/:tweetId', addLikedTweet);

export default likedTweetsRouter;
