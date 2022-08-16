"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const userRouter = (0, express_1.Router)();
userRouter.post('/create', userMiddlewares_1.emailValidation, userMiddlewares_1.nameValidation, userMiddlewares_1.passwordValidation, userController_1.createUser);
userRouter.post('/login', userMiddlewares_1.emailValidation, userMiddlewares_1.passwordValidation, userController_1.loginUser);
exports.default = userRouter;
