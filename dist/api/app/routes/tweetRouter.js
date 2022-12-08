"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = __importDefault(require("../controllers/tweetController"));
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const tweetMiddlewares_1 = __importDefault(require("../middlewares/tweetMiddlewares"));
const tweetRouter = (0, express_1.Router)();
tweetRouter.post('/create/:userId', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, tweetMiddlewares_1.default, tweetController_1.default.createTweet);
tweetRouter.get('/', tokenMiddleware_1.tokenValidation, tweetController_1.default.getTweets);
tweetRouter.get('/:userId', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, tweetController_1.default.getTweetsByUserId);
tweetRouter.delete('/:tweetId/:userId', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, tweetController_1.default.excludeTweet);
tweetRouter.post('/like/:userId/:tweetId', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, tweetController_1.default.likeTweet);
tweetRouter.get('/liked/:userId', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, tweetController_1.default.getLikedTweets);
exports.default = tweetRouter;
