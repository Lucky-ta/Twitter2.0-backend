"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tweetRouter_1 = __importDefault(require("./app/routes/tweetRouter"));
const userRouter_1 = __importDefault(require("./app/routes/userRouter"));
const likedTweets_1 = __importDefault(require("./app/routes/likedTweets"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/user', userRouter_1.default);
app.use('/tweet', tweetRouter_1.default);
app.use('/likedTweets', likedTweets_1.default);
exports.default = app;
