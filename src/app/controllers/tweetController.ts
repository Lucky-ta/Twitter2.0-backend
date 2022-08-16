import { Request, Response } from 'express';
import { getAllTweets, postTweet } from '../services/tweetServices';

const createTweet = async (req: Request, res: Response) => {
  try {
    const { tweet } = req.body;
    const { userData } = req;
    const result = await postTweet(userData, tweet);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const getTweets = async (req: Request, res: Response) => {
  try {
    const response = await getAllTweets();
    return res.status(response.status).json(response.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export { createTweet, getTweets };
