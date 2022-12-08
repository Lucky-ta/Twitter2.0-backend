"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidationMiddleware = (token, SECRET) => {
    if (!token)
        return { message: 'Token not found' };
    try {
        const userData = jsonwebtoken_1.default.verify(token, SECRET);
        return userData;
    }
    catch (e) {
        return { message: e.message };
    }
};
exports.default = tokenValidationMiddleware;
