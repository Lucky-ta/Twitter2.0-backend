import { Request, Response } from 'express';
import { deslikeNewTweet, likeNewTweet, listLikedTweets } from '../services/likedTweetsServices';

const addLikedTweet = async (req: Request, res: Response) => {
  try {
    const { userId, tweetId } = req.params;
    const parsedUserId = Number(userId);
    const parsedTweetId = Number(tweetId);
    const result = await likeNewTweet(parsedUserId, parsedTweetId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const RemoveLikedTweet = async (req: Request, res: Response) => {
  try {
    const { userId, tweetId } = req.params;
    const parsedUserId = Number(userId);
    const parsedTweetId = Number(tweetId);
    const result = await deslikeNewTweet(parsedUserId, parsedTweetId);
    return res.status(result.status).end();
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const getLikedTweetsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = Number(userId);
    const result = await listLikedTweets(parsedUserId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export {
  addLikedTweet,
  RemoveLikedTweet,
  getLikedTweetsByUserId,
};
