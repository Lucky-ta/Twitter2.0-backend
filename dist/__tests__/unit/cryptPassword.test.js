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
/* eslint-disable no-undef */
const bycryptFunctions_1 = require("../../api/app/services/accountSecurity/bycrypt/bycryptFunctions");
const passwordTest = '123456';
let passwordInDatabase;
describe('Test crypt password functions', () => {
    describe('Test has password function', () => {
        it('should return a hashed password given a password', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, bycryptFunctions_1.hashPassword)(passwordTest);
            expect(result).not.toStrictEqual(passwordTest);
        }));
        it('should return a hashed password of type string given a password', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, bycryptFunctions_1.hashPassword)(passwordTest);
            expect(typeof result).toBe('string');
        }));
    });
    describe('Test password validation function', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            passwordInDatabase = yield (0, bycryptFunctions_1.hashPassword)(passwordTest);
        }));
        it('should return True given a valid password', () => __awaiter(void 0, void 0, void 0, function* () {
            const userPasswordTest = { password: passwordInDatabase };
            const result = yield (0, bycryptFunctions_1.passwordValidation)(passwordTest, userPasswordTest);
            expect(result).toBe(true);
        }));
        it('should return False given a invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
            const userPasswordTest = { password: '123' };
            const result = yield (0, bycryptFunctions_1.passwordValidation)(passwordTest, userPasswordTest);
            expect(result).toBe(false);
        }));
    });
});
