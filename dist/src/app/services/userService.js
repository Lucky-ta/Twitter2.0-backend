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
exports.editName = exports.excludeAccount = exports.loginUserAccount = exports.postUser = exports.validateResponse = void 0;
const secret_1 = __importDefault(require("../secret"));
const bycryptFunctions_1 = require("./accountSecurity/bycrypt/bycryptFunctions");
const JwtFunctions_1 = __importDefault(require("./accountSecurity/token/JwtFunctions"));
const userMessages_1 = __importDefault(require("./errorMessages/userMessages"));
const { User } = require('../../database/models');
const validateResponse = (response, errorMessage, statusCode) => {
    if (response !== null) {
        return { status: statusCode, data: response };
    }
    return { status: 404, data: { message: errorMessage } };
};
exports.validateResponse = validateResponse;
const isUserInDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserByEmail = yield User.findOne({
        where: { email },
    });
    if (findUserByEmail) {
        return true;
    }
    return false;
});
const postUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = body;
    const isUserRegistered = yield isUserInDb(email);
    if (isUserRegistered) {
        return { status: 404, data: { message: userMessages_1.default.emailError } };
    }
    const hasPassword = yield (0, bycryptFunctions_1.hashPassword)(password);
    const newUser = yield User.create({
        name, email, password: hasPassword,
    });
    const _a = newUser.dataValues, { password: passDb } = _a, userWithouPassword = __rest(_a, ["password"]);
    return (0, exports.validateResponse)(userWithouPassword, userMessages_1.default.userError, 201);
});
exports.postUser = postUser;
const loginUserAccount = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userCredentials;
    const existUser = yield User.findOne({ where: { email } });
    if (existUser === null) {
        return { status: 404, data: { message: userMessages_1.default.userError } };
    }
    const { dataValues } = existUser;
    const isValidPassword = yield (0, bycryptFunctions_1.passwordValidation)(password, dataValues);
    if (isValidPassword) {
        const token = (0, JwtFunctions_1.default)(dataValues, secret_1.default);
        return { status: 200, data: token };
    }
    return { status: 404, data: { message: userMessages_1.default.passwordError } };
});
exports.loginUserAccount = loginUserAccount;
const excludeAccount = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteTweet = yield User.destroy({ where: { id: accountId } });
    return (0, exports.validateResponse)(deleteTweet, userMessages_1.default.userError, 200);
});
exports.excludeAccount = excludeAccount;
const editName = (userId, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserName = yield User.update({ name: newName }, { where: { id: userId } });
    return (0, exports.validateResponse)(updateUserName, userMessages_1.default.userError, 200);
});
exports.editName = editName;
