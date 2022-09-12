"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likedTweetsController_1 = require("../controllers/likedTweetsController");
const tweetMiddlewares_1 = require("../middlewares/tweetMiddlewares");
const likedTweetsRouter = (0, express_1.Router)();
likedTweetsRouter.post('/:userId/:tweetId', tweetMiddlewares_1.tokenValidation, likedTweetsController_1.addLikedTweet);
likedTweetsRouter.delete('/:userId/:tweetId', tweetMiddlewares_1.tokenValidation, likedTweetsController_1.RemoveLikedTweet);
exports.default = likedTweetsRouter;
