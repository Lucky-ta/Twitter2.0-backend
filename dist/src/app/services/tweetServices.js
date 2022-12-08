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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLikedTweets = exports.likeNewTweet = exports.getUserTweetsById = exports.destroyTweet = exports.getAllTweets = exports.postTweet = void 0;
const tweetMessages_1 = __importDefault(require("./errorMessages/tweetMessages"));
const userMessages_1 = __importDefault(require("./errorMessages/userMessages"));
const userService_1 = require("./userService");
const { Tweet, User, LikedTweets } = require('../../database/models');
const postTweet = (userData, tweet) => __awaiter(void 0, void 0, void 0, function* () {
    const createTweet = yield Tweet.create({ userId: userData === null || userData === void 0 ? void 0 : userData.id, tweet });
    return (0, userService_1.validateResponse)(createTweet, 'Not created', 201);
});
exports.postTweet = postTweet;
const getAllTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTweets = yield Tweet.findAll({
        attributes: ['tweet', 'id', 'likes'],
        include: [
            { model: User, required: true, attributes: ['name', 'id'] },
        ],
    });
    return (0, userService_1.validateResponse)(allTweets, tweetMessages_1.default.tweetError, 200);
});
exports.getAllTweets = getAllTweets;
const destroyTweet = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    yield LikedTweets.destroy({ where: { tweetId } });
    const deleteTweet = yield Tweet.destroy({ where: { id: tweetId } });
    return (0, userService_1.validateResponse)(deleteTweet, tweetMessages_1.default.tweetError, 200);
});
exports.destroyTweet = destroyTweet;
const getUserTweetsById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userTweets = yield Tweet.findAll({
        where: { userId },
        attributes: ['tweet', 'id', 'likes'],
        include: [
            { model: User, required: true, attributes: ['name', 'id'] },
        ],
    });
    return (0, userService_1.validateResponse)(userTweets, tweetMessages_1.default.tweetError, 200);
});
exports.getUserTweetsById = getUserTweetsById;
const sumTweetLike = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield Tweet.findOne({ where: { id: tweetId } });
    const { likes: currentLikes } = tweet.dataValues;
    const sumTweet = yield Tweet.update({ likes: currentLikes + 1 }, { where: { id: tweetId } });
    return (0, userService_1.validateResponse)(sumTweet, tweetMessages_1.default.tweetError, 200);
});
const subtractTweetLike = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield Tweet.findOne({ where: { id: tweetId } });
    const { likes: currentLikes } = tweet.dataValues;
    const subtractTweet = yield Tweet.update({ likes: currentLikes - 1 }, { where: { id: tweetId } });
    return (0, userService_1.validateResponse)(subtractTweet, tweetMessages_1.default.tweetError, 200);
});
const likeNewTweet = (userId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const isTweetLiked = yield LikedTweets.findOne({ where: { userId, tweetId } });
    if (isTweetLiked !== null) {
        const unlikeTweet = yield LikedTweets.destroy({ where: { userId, tweetId } });
        yield subtractTweetLike(tweetId);
        if (unlikeTweet !== null) {
            return { status: 201, data: { action: 'Unliked' } };
        }
        return { status: 404, data: userMessages_1.default.userError };
    }
    const likeTweet = yield LikedTweets.create({ userId, tweetId });
    yield sumTweetLike(tweetId);
    if (likeTweet !== null) {
        return { status: 201, data: { action: 'Liked' } };
    }
    return { status: 404, data: tweetMessages_1.default.tweetError };
});
exports.likeNewTweet = likeNewTweet;
const filterLikedTweets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const likedTweets = [];
    const likedTweetsIds = yield LikedTweets.findAll({ where: { userId }, attributes: ['tweetId'] });
    if (likedTweetsIds !== null) {
        yield Promise.all(likedTweetsIds.map(({ dataValues }) => __awaiter(void 0, void 0, void 0, function* () {
            const tweetById = yield Tweet.findOne({
                where: { id: dataValues.tweetId },
                attributes: ['tweet', 'id', 'likes'],
                include: [
                    { model: User, required: true, attributes: ['name', 'id'] },
                ],
            });
            likedTweets.push(tweetById.dataValues);
        })));
        return { status: 200, data: likedTweets };
    }
    return { status: 404, data: tweetMessages_1.default.tweetError };
});
exports.filterLikedTweets = filterLikedTweets;
