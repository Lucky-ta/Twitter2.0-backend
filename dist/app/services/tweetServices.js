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
exports.updateTweetLike = exports.editTweet = exports.getUserTweets = exports.destroyTweet = exports.getAllTweets = exports.postTweet = void 0;
const { Tweet, User } = require('../../database/models');
const postTweet = (userData, tweet) => __awaiter(void 0, void 0, void 0, function* () {
    const createTweet = yield Tweet.create({ userId: userData === null || userData === void 0 ? void 0 : userData.id, tweet });
    if (createTweet !== null) {
        return { status: 201, data: createTweet };
    }
    return { status: 404, data: { message: 'Erro ao criar tweet' } };
});
exports.postTweet = postTweet;
const getAllTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTweets = yield Tweet.findAll({
        attributes: ['tweet', 'id', 'likes'],
        include: [
            { model: User, required: true, attributes: ['name', 'id'] },
        ],
    });
    if (allTweets !== null) {
        return { status: 201, data: allTweets };
    }
    return { status: 404, data: { message: 'Erro ao pegar tweets' } };
});
exports.getAllTweets = getAllTweets;
const destroyTweet = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteTweet = yield Tweet.destroy({ where: { id: tweetId } });
    if (deleteTweet !== null) {
        return { status: 200 };
    }
    return { status: 404 };
});
exports.destroyTweet = destroyTweet;
const getUserTweets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userTweets = yield Tweet.findAll({ where: { userId } });
    if (userTweets !== null) {
        return { status: 200, data: userTweets };
    }
    return { status: 400, data: { message: 'User not found' } };
});
exports.getUserTweets = getUserTweets;
const editTweet = (tweetId, newTweet) => __awaiter(void 0, void 0, void 0, function* () {
    const editedTweet = yield Tweet.update({ tweet: newTweet }, { where: { id: tweetId } });
    if (editedTweet !== null) {
        return { status: 200, data: editedTweet };
    }
    return { status: 400, data: { message: 'Tweet not found' } };
});
exports.editTweet = editTweet;
const updateTweetLike = (tweetId, likeSign) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTweet = yield Tweet.findByPk(tweetId);
    if (likeSign === '+') {
        const sumTweetLikes = yield Tweet.update({ likes: currentTweet.dataValues.likes + 1 }, { where: { id: tweetId } });
        if (sumTweetLikes !== null) {
            return { status: 200, data: sumTweetLikes };
        }
        return { status: 404, data: { message: 'Tweet not found' } };
    }
    if (likeSign === '-') {
        const subtractTweetLikes = yield Tweet.update({ likes: currentTweet.dataValues.likes - 1 }, { where: { id: tweetId } });
        if (subtractTweetLikes !== null) {
            return { status: 200, data: subtractTweetLikes };
        }
        return { status: 404, data: { message: 'Tweet not found' } };
    }
    return { status: 404, data: { message: 'Action not available' } };
});
exports.updateTweetLike = updateTweetLike;
