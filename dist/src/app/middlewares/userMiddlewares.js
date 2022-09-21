"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidation = exports.nameValidation = exports.emailValidation = void 0;
const userErrorMessages_1 = __importDefault(require("./errorMessages/userErrorMessages"));
const emailValidation = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    if (!email) {
        return res.status(404).json({ message: userErrorMessages_1.default.requiredError });
    }
    if (!isEmailValid) {
        return res.status(404).json({ message: userErrorMessages_1.default.emailError });
    }
    return next();
};
exports.emailValidation = emailValidation;
const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(404).json({ message: userErrorMessages_1.default.requiredError });
    }
    const isNameValid = name.length >= 3;
    if (!isNameValid) {
        return res.status(404).json({ message: userErrorMessages_1.default.nameError });
    }
    return next();
};
exports.nameValidation = nameValidation;
const passwordValidation = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(404).json({ message: userErrorMessages_1.default.requiredError });
    }
    const isPasswordValid = password.length >= 3;
    if (!isPasswordValid) {
        return res.status(404).json({ message: userErrorMessages_1.default.passwordError });
    }
    return next();
};
exports.passwordValidation = passwordValidation;
