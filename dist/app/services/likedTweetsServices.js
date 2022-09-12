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
exports.listLikedTweets = exports.deslikeNewTweet = exports.likeNewTweet = void 0;
const { LikedTweets } = require('../../database/models');
const likeNewTweet = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const likeTweet = yield LikedTweets.create({ userId, tweetId });
    if (likeTweet !== null) {
        return { status: 201, data: likeNewTweet };
    }
    return { status: 404, data: { message: 'Create error' } };
});
exports.likeNewTweet = likeNewTweet;
const deslikeNewTweet = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const likeTweet = yield LikedTweets.destroy({ where: { userId, tweetId } });
    if (likeTweet !== null) {
        return { status: 200 };
    }
    return { status: 404 };
});
exports.deslikeNewTweet = deslikeNewTweet;
const listLikedTweets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const likedTweets = yield LikedTweets.findAll({ where: { userId } });
    if (likedTweets !== null) {
        return { status: 201, data: likedTweets };
    }
    return { status: 404, data: { message: 'User not found' } };
});
exports.listLikedTweets = listLikedTweets;
