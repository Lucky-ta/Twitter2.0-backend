"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetServices_1 = require("../services/tweetServices");
class TweetController {
    constructor(service) {
        this.createTweet = this.createTweet.bind(this);
        this.getTweets = this.getTweets.bind(this);
        this.excludeTweet = this.excludeTweet.bind(this);
        this.getTweetsByUserId = this.getTweetsByUserId.bind(this);
        this.likeTweet = this.likeTweet.bind(this);
        this.getLikedTweets = this.getLikedTweets.bind(this);
        this.service = service;
    }
    createTweet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tweet } = req.body;
                const { userData } = req;
                const result = yield this.service.postTweet(userData, tweet);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    getTweets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.service.getAllTweets();
                return res.status(response.status).json(response.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    excludeTweet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                const parsedId = Number(tweetId);
                const response = yield this.service.destroyTweet(parsedId);
                return res.status(response.status).end();
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    getTweetsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const parsedId = Number(userId);
                const result = yield this.service.getUserTweetsById(parsedId);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    likeTweet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, tweetId } = req.params;
                const parsedUserId = Number(userId);
                const parsedTweetId = Number(tweetId);
                const result = yield this.service.likeNewTweet(parsedUserId, parsedTweetId);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    getLikedTweets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const parsedUserId = Number(userId);
                const result = yield this.service.filterLikedTweets(parsedUserId);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
}
const service = {
    destroyTweet: tweetServices_1.destroyTweet,
    getAllTweets: tweetServices_1.getAllTweets,
    postTweet: tweetServices_1.postTweet,
    getUserTweetsById: tweetServices_1.getUserTweetsById,
    likeNewTweet: tweetServices_1.likeNewTweet,
    filterLikedTweets: tweetServices_1.filterLikedTweets,
};
exports.default = new TweetController(service);
