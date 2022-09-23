"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const userRouter = (0, express_1.Router)();
userRouter.post('/create', userMiddlewares_1.emailValidation, userMiddlewares_1.nameValidation, userMiddlewares_1.passwordValidation, userController_1.default.createUser);
userRouter.post('/login', userMiddlewares_1.emailValidation, userMiddlewares_1.passwordValidation, userController_1.default.loginUser);
userRouter.put('/edit/:id', userMiddlewares_1.nameValidation, tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, userController_1.default.editUserName);
userRouter.get('/:userId', userController_1.default.getUserById);
userRouter.delete('/exclude/:id', tokenMiddleware_1.tokenValidation, tokenMiddleware_1.userActionValidation, userController_1.default.deleteUser);
exports.default = userRouter;
