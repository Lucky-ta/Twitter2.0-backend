import { Request, Response } from 'express';
import {
  destroyTweet,
  getAllTweets,
  postTweet,
  getUserTweets,
  editTweet,
  updateTweetLike,
  tweetsByTweetId,
} from '../services/tweetServices';

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

const excludeTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const response = await destroyTweet(parsedId);
    return res.status(response.status).end();
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const getTweetsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const result = await getUserTweets(parsedId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const editTweetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const { tweet } = req.body;
    const result = await editTweet(parsedId, tweet);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const likeTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);
    const { likeSign } = req.body;

    const result = await updateTweetLike(parsedId, likeSign);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const getTweetsByTweetId = async (req: Request, res: Response) => {
  try {
    const { tweetId } = req.params;
    const parsedId = Number(tweetId);
    const result = await tweetsByTweetId(parsedId);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export {
  createTweet,
  getTweets,
  excludeTweet,
  getTweetsByUserId,
  editTweetById,
  likeTweet,
  getTweetsByTweetId,
};
