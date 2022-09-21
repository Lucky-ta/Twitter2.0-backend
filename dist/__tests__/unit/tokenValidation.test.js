"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const JwtFunctions_1 = __importDefault(require("../../src/app/services/accountSecurity/token/JwtFunctions"));
const userCredentials_1 = __importDefault(require("../mock/userCredentials"));
const validateMocks_1 = __importDefault(require("../mock/validateMocks"));
const invalidSecret = 'invalidSecret';
const testSecret = 'testSecret';
let token;
describe('Test validate token functions', () => {
    describe('JWT sign function (SERVICE)', () => {
        it('should return a token access of string type with valid credentials', () => {
            const result = (0, JwtFunctions_1.default)(userCredentials_1.default.validCredentials, testSecret);
            expect(typeof result).toBe('string');
        });
    });
    describe('JWT verify function (MIDDLEWARE)', () => {
        beforeEach(() => {
            token = (0, JwtFunctions_1.default)(userCredentials_1.default.validCredentials, testSecret);
        });
        it('should return user data with valid secret and token', () => {
            const expectedResult = {
                id: 1,
                name: '',
                email: '',
                iat: '',
                exp: '',
            };
            const result = (0, validateMocks_1.default)(token, testSecret);
            expect(Object.keys(result)).toMatchObject(Object.keys(expectedResult));
        });
        it('should return a error message with invalid secret', () => {
            const expectedResult = { message: 'invalid signature' };
            const result = (0, validateMocks_1.default)(token, invalidSecret);
            expect(result).toStrictEqual(expectedResult);
        });
    });
});
