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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.passwordValidation = void 0;
const bcrypt_1 = require("bcrypt");
const passwordValidation = (hashPassword, dbDataValues) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidPassword = yield (0, bcrypt_1.compare)(hashPassword, dbDataValues.password);
    return isValidPassword;
});
exports.passwordValidation = passwordValidation;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const response = yield (0, bcrypt_1.hash)(password, saltRounds);
    return response;
});
exports.hashPassword = hashPassword;
