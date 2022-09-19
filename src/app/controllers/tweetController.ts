import { Request, Response } from 'express';
import {
  destroyTweet,
  getAllTweets,
  postTweet,
  getUserTweetsById,
  likeNewTweet,
  filterLikedTweets,
} from '../services/tweetServices';
import { serviceTweetShape } from './types/controllersTypes';

class TweetController {
  private service: serviceTweetShape;

  constructor(service: serviceTweetShape) {
    this.createTweet = this.createTweet.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.excludeTweet = this.excludeTweet.bind(this);
    this.getTweetsByUserId = this.getTweetsByUserId.bind(this);
    this.likeTweet = this.likeTweet.bind(this);
    this.getLikedTweets = this.getLikedTweets.bind(this);
    this.service = service;
  }

  async createTweet(req: Request, res: Response) {
    try {
      const { tweet } = req.body;
      const { userData } = req;
      const result = await this.service.postTweet(userData, tweet);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async getTweets(req: Request, res: Response) {
    try {
      const response = await this.service.getAllTweets();
      return res.status(response.status).json(response.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async excludeTweet(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      const parsedId = Number(tweetId);
      const response = await this.service.destroyTweet(parsedId);
      return res.status(response.status).end();
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async getTweetsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const parsedId = Number(userId);
      const result = await this.service.getUserTweetsById(parsedId);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async likeTweet(req: Request, res: Response) {
    try {
      const { userId, tweetId } = req.params;
      const parsedUserId = Number(userId);
      const parsedTweetId = Number(tweetId);
      const result = await this.service.likeNewTweet(parsedUserId, parsedTweetId);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async getLikedTweets(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const parsedUserId = Number(userId);
      const result = await this.service.filterLikedTweets(parsedUserId);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }
}

const service = {
  destroyTweet,
  getAllTweets,
  postTweet,
  getUserTweetsById,
  likeNewTweet,
  filterLikedTweets,
};

export default new TweetController(service);
