import { Request, Response } from 'express';
import { postTweet } from '../services/tweetServices';

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

export { createTweet };
