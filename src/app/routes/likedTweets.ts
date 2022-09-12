import { Router } from 'express';
import { addLikedTweet, RemoveLikedTweet } from '../controllers/likedTweetsController';

const likedTweetsRouter = Router();

likedTweetsRouter.post('/:userId/:tweetId', addLikedTweet);
likedTweetsRouter.delete('/:userId/:tweetId', RemoveLikedTweet);

export default likedTweetsRouter;
