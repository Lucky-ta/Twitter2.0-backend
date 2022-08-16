"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tweetRouter_1 = __importDefault(require("./app/routes/tweetRouter"));
const userRouter_1 = __importDefault(require("./app/routes/userRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', userRouter_1.default);
app.use('/tweet', tweetRouter_1.default);
exports.default = app;
