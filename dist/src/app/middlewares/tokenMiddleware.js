"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userActionValidation = exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../secret"));
const validateError_1 = __importDefault(require("./errorMessages/validateError"));
const tokenValidation = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token)
        return res.status(401).json({ message: 'Token not found' });
    try {
        const userData = jsonwebtoken_1.default.verify(token, secret_1.default);
        req.userData = userData;
    }
    catch (e) {
        return res.status(401).json({ message: e.message });
    }
    return next();
};
exports.tokenValidation = tokenValidation;
const userActionValidation = (req, res, next) => {
    const userParamsId = req.userData.id;
    const { id, userId } = req.params;
    const parsedId = Number(id || userId);
    if (userParamsId !== parsedId) {
        return res.status(404).json(validateError_1.default.actionError);
    }
    return next();
};
exports.userActionValidation = userActionValidation;
