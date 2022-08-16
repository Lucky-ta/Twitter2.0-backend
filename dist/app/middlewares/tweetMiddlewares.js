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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetValidation = exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../secret"));
const tweetErrorMessages_1 = __importDefault(require("./errorMessages/tweetErrorMessages"));
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
const tweetValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweet } = req.body;
    if (!tweet || tweet === '')
        return res.status(404).json(tweetErrorMessages_1.default.tweetError);
    return next();
});
exports.tweetValidation = tweetValidation;
