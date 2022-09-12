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
exports.getLikedTweetsByUserId = exports.RemoveLikedTweet = exports.addLikedTweet = void 0;
const likedTweetsServices_1 = require("../services/likedTweetsServices");
const addLikedTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, tweetId } = req.params;
        const parsedUserId = Number(userId);
        const parsedTweetId = Number(tweetId);
        const result = yield (0, likedTweetsServices_1.likeNewTweet)(parsedUserId, parsedTweetId);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.addLikedTweet = addLikedTweet;
const RemoveLikedTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, tweetId } = req.params;
        const parsedUserId = Number(userId);
        const parsedTweetId = Number(tweetId);
        const result = yield (0, likedTweetsServices_1.deslikeNewTweet)(parsedUserId, parsedTweetId);
        return res.status(result.status).end();
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.RemoveLikedTweet = RemoveLikedTweet;
const getLikedTweetsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const parsedUserId = Number(userId);
        const result = yield (0, likedTweetsServices_1.listLikedTweets)(parsedUserId);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.getLikedTweetsByUserId = getLikedTweetsByUserId;
