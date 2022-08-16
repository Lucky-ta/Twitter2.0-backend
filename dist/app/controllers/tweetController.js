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
exports.excludeTweet = exports.getTweets = exports.createTweet = void 0;
const tweetServices_1 = require("../services/tweetServices");
const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tweet } = req.body;
        const { userData } = req;
        const result = yield (0, tweetServices_1.postTweet)(userData, tweet);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.createTweet = createTweet;
const getTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, tweetServices_1.getAllTweets)();
        return res.status(response.status).json(response.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.getTweets = getTweets;
const excludeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedId = Number(id);
        const response = yield (0, tweetServices_1.destroyTweet)(parsedId);
        return res.status(response.status).end();
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.excludeTweet = excludeTweet;
