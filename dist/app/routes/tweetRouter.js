"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
const tweetMiddlewares_1 = require("../middlewares/tweetMiddlewares");
const tweetRouter = (0, express_1.Router)();
tweetRouter.post('/create', tweetMiddlewares_1.tokenValidation, tweetMiddlewares_1.tweetValidation, tweetController_1.createTweet);
tweetRouter.get('/', tweetController_1.getTweets);
tweetRouter.get('/:id', tweetMiddlewares_1.tokenValidation, tweetController_1.getTweetsByUserId);
tweetRouter.put('/:id', tweetMiddlewares_1.tokenValidation, tweetMiddlewares_1.tweetValidation, tweetController_1.editTweetById);
tweetRouter.put('/like/:id', tweetMiddlewares_1.tokenValidation, tweetMiddlewares_1.likeSignValidation, tweetController_1.likeTweet);
tweetRouter.delete('/:id', tweetMiddlewares_1.tokenValidation, tweetController_1.excludeTweet);
exports.default = tweetRouter;
