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
/* eslint-disable no-undef */
const userErrorMessages_1 = __importDefault(require("../../src/app/middlewares/errorMessages/userErrorMessages"));
const validateError_1 = __importDefault(require("../../src/app/middlewares/errorMessages/validateError"));
const userMessages_1 = __importDefault(require("../../src/app/services/errorMessages/userMessages"));
const supertestsFunctions_1 = require("../utils/supertestsFunctions");
const userCredentials_1 = __importDefault(require("../mock/userCredentials"));
const truncate = require('../utils/truncateDb');
let userToken;
let registeredUserId;
describe('Test user router', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield truncate();
    }));
    describe('POST: /user/create', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
        }));
        it('should return status code 201 with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            expect(response.statusCode).toBe(201);
        }));
        it('should return user data with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const { id } = response.body;
            const expectResponse = { email: 'lucmaieski@gmail.com', id, name: 'Lucas' };
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return status code 404 with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsWithoutPass);
            expect(response.statusCode).toBe(404);
        }));
        it('should return a error message with invalid credentials (no email)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsWithoutemail);
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return a error message with invalid credentials (no password)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsWithoutPass);
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return a error message with invalid credentials (no name)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsWithoutname);
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return a error message with invalid credentials (empty name)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsEmptytname);
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return a error message with invalid credentials (empty password)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsEmptyPass);
            expect(response.body).toStrictEqual(expectResponse);
        }));
        it('should return a error message with invalid credentials (empty email)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectResponse = { message: userErrorMessages_1.default.requiredError };
            const response = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.credentialsEmptyemail);
            expect(response.body).toStrictEqual(expectResponse);
        }));
    });
    describe('POST: /user/login', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
        }));
        it('should return status code 200 with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            expect(result.statusCode).toBe(200);
        }));
        it('should return a token access with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            expect(typeof result.body).toBe('string');
        }));
        it('should return status code 404 with invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.credentialsEmptyPass);
            expect(result.statusCode).toBe(404);
        }));
        it('should return a error message with invalid credentials (invalid password)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResponse = { message: userMessages_1.default.passwordError };
            const result = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.credentialsInvalidPass);
            expect(result.body).toStrictEqual(expectedResponse);
        }));
        it('should return a error message with invalid credentials (invalid email)', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResponse = { message: userMessages_1.default.userError };
            const result = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.credentialsInvalidEmail);
            expect(result.body).toStrictEqual(expectedResponse);
        }));
    });
    describe('PUT: /user/edit/:id', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResult = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginReponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            registeredUserId = createResult.body.id;
            userToken = loginReponse.body;
        }));
        it('should return status code 200 with a valid new user name', () => __awaiter(void 0, void 0, void 0, function* () {
            const parsedId = String(registeredUserId);
            const newName = 'Billy';
            const result = yield (0, supertestsFunctions_1.editUserName)(parsedId, newName, userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return status code 404 with a invalid new user name', () => __awaiter(void 0, void 0, void 0, function* () {
            const parsedId = String(registeredUserId);
            const newName = 'Lu';
            const result = yield (0, supertestsFunctions_1.editUserName)(parsedId, newName, userToken);
            expect(result.statusCode).toBe(404);
        }));
        it('should return invalid action error with a invalid user id', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = '4';
            const newName = 'Billy';
            const result = yield (0, supertestsFunctions_1.editUserName)(userId, newName, userToken);
            expect(result.body).toStrictEqual(validateError_1.default.actionError);
        }));
    });
    describe('DELETE: /user/exclude/:id', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            registeredUserId = createResponse.body.id;
            userToken = loginResponse.body;
        }));
        it('should return status code 200 with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const parsedId = String(registeredUserId);
            const result = yield (0, supertestsFunctions_1.deleteUser)(parsedId, userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return status code 404 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const parsedId = String(registeredUserId);
            const result = yield (0, supertestsFunctions_1.deleteUser)(parsedId, userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toBe(401);
        }));
        it('should return status code 404 with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = '5';
            const result = yield (0, supertestsFunctions_1.deleteUser)(userId, userToken);
            expect(result.statusCode).toBe(404);
        }));
    });
});
