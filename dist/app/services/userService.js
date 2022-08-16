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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserAccount = exports.postUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../secret"));
const { User } = require('../../database/models');
const passwordValidation = (password, dbDataValues) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidPassword = yield (0, bcrypt_1.compare)(password, dbDataValues.password);
    return isValidPassword;
});
const signToken = (dbDataValues, secret) => {
    const { password: passDb } = dbDataValues, userWithouPassword = __rest(dbDataValues, ["password"]);
    const token = jsonwebtoken_1.default.sign(userWithouPassword, secret, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });
    return token;
};
const postUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = body;
    const findUserByEmail = yield User.findOne({
        where: { email },
    });
    if (findUserByEmail) {
        return { status: 404, data: { message: 'E-mail já cadastrado' } };
    }
    const saltRounds = 10;
    const hasPassword = yield (0, bcrypt_1.hash)(password, saltRounds);
    const newUser = yield User.create({
        name, email, password: hasPassword,
    });
    return { status: 201, data: newUser };
});
exports.postUser = postUser;
const loginUserAccount = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userCredentials;
    const isValidUser = yield User.findOne({ where: { email } });
    if (isValidUser === null) {
        return { status: 404, data: { message: 'Invalid User' } };
    }
    const { dataValues } = isValidUser;
    const isValidPassword = yield passwordValidation(password, dataValues);
    if (isValidPassword) {
        const token = signToken(dataValues, secret_1.default);
        return { status: 200, data: token };
    }
    return { status: 404, data: { message: 'Invald password' } };
});
exports.loginUserAccount = loginUserAccount;
