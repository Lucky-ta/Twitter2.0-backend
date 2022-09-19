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
const supertestsFunctions_1 = require("../utils/supertestsFunctions");
const userCredentials_1 = __importDefault(require("../mock/userCredentials"));
const tweetMock_1 = __importDefault(require("../mock/tweetMock"));
const validateError_1 = __importDefault(require("../../src/app/middlewares/errorMessages/validateError"));
/* eslint-disable no-undef */
const truncate = require('../utils/truncateDb');
let userToken;
let registeredUserId;
let tweetId;
describe('Test tweet router', () => {
    describe('POST: /tweet/create/:userId', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
        }));
        it('should return status code 201 with valid token and tweet', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            expect(result.statusCode).toBe(201);
        }));
        it('should return the posted tweet with valid token and tweet', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            const expectedResult = {
                id: result.body.id,
                tweet: tweetMock_1.default.validTweet,
                userId: registeredUserId,
            };
            expect(result.body).toStrictEqual(expectedResult);
        }));
        it('should return status code 404 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toStrictEqual(401);
        }));
        it('should return status code 404 with invalid tweet (empty tweet)', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.invalidTweet, registeredUserId, userToken);
            expect(result.statusCode).toStrictEqual(404);
        }));
    });
    describe('GET: /tweet', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
            const tweetResult = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            tweetId = tweetResult.body.id;
        }));
        it('should return status code 200 with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getAllTweets)(userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return an array of tweets with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedTweetResponse = {
                User: {
                    id: registeredUserId,
                    name: userCredentials_1.default.validCredentials.name,
                },
                id: tweetId,
                likes: 0,
                tweet: tweetMock_1.default.validTweet,
            };
            const expectedResult = [expectedTweetResponse];
            const result = yield (0, supertestsFunctions_1.getAllTweets)(userToken);
            expect(result.body).toHaveLength(1);
            expect(result.body).toStrictEqual(expectedResult);
        }));
        it('should return an ampty array if there is no tweets in database', () => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const result = yield (0, supertestsFunctions_1.getAllTweets)(userToken);
            expect(result.body).toHaveLength(0);
        }));
        it('should return status code 401 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getAllTweets)(userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toBe(401);
        }));
        it('should return malformed token error message with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedResult = { message: 'jwt malformed' };
            const result = yield (0, supertestsFunctions_1.getAllTweets)(userCredentials_1.default.invalidUserToken);
            expect(result.body).toStrictEqual(expectedResult);
        }));
    });
    describe('GET: /tweet/:userId', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
            const tweetResult = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            tweetId = tweetResult.body.id;
        }));
        it('should return status code 200 with valid token and user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(registeredUserId, userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return all tweets by user ID with valid token and ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(registeredUserId, userToken);
            const expectedTweetResponse = {
                User: {
                    id: registeredUserId,
                    name: userCredentials_1.default.validCredentials.name,
                },
                id: tweetId,
                likes: 0,
                tweet: tweetMock_1.default.validTweet,
            };
            const expectedResult = [expectedTweetResponse];
            expect(result.body).toHaveLength(1);
            expect(result.body).toStrictEqual(expectedResult);
        }));
        it('should return status code 401 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(registeredUserId, userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toBe(401);
        }));
        it('should return status code 404 with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(userCredentials_1.default.invalidUserId, userToken);
            expect(result.statusCode).toBe(404);
        }));
        it('should return invalid action error message with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(userCredentials_1.default.invalidUserId, userToken);
            expect(result.body).toBe(validateError_1.default.actionError);
        }));
    });
    describe('DELETE: /tweet/:id', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
            const tweetResult = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            tweetId = tweetResult.body.id;
        }));
        it('should return status code 200 with valid token and user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.deleteTweetById)(tweetId, registeredUserId, userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return an empty array after delete tweet with valid token and user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertestsFunctions_1.deleteTweetById)(tweetId, registeredUserId, userToken);
            const result = yield (0, supertestsFunctions_1.getTweetsByUserId)(registeredUserId, userToken);
            expect(result.body).toHaveLength(0);
        }));
        it('should return status code 401 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.deleteTweetById)(tweetId, registeredUserId, userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toBe(401);
        }));
        it('should return status code 404 with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.deleteTweetById)(tweetId, userCredentials_1.default.invalidUserId, userToken);
            expect(result.statusCode).toBe(404);
        }));
        it('should return invalid action error message with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.deleteTweetById)(tweetId, userCredentials_1.default.invalidUserId, userToken);
            expect(result.body).toBe(validateError_1.default.actionError);
        }));
    });
    describe('POST: /tweet/like/:userId/:tweetId', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
            const tweetResult = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            tweetId = tweetResult.body.id;
        }));
        it('should return status code 201 with valid user ID and token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userToken);
            expect(response.statusCode).toBe(201);
        }));
        it('should return a action description `Liked` on body with valid user ID and token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userToken);
            const expectedResponse = { action: 'Liked' };
            expect(response.body).toStrictEqual(expectedResponse);
        }));
        it('should return a action description `Unlike` on body if user already liked the tweet', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userToken);
            const response = yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userToken);
            const expectedResponse = { action: 'Unliked' };
            expect(response.body).toStrictEqual(expectedResponse);
        }));
        it('should return status code 401 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userCredentials_1.default.invalidUserToken);
            expect(response.statusCode).toBe(401);
        }));
        it('should return status code 404 with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertestsFunctions_1.likeTweet)(userCredentials_1.default.invalidUserId, tweetId, userToken);
            expect(response.statusCode).toBe(404);
        }));
    });
    describe('GET: /tweet/liked/:userId', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield truncate();
            const createResponse = yield (0, supertestsFunctions_1.createUser)(userCredentials_1.default.validCredentials);
            const loginResponse = yield (0, supertestsFunctions_1.signInUser)(userCredentials_1.default.validCredentials);
            userToken = loginResponse.body;
            registeredUserId = createResponse.body.id;
            const tweetResult = yield (0, supertestsFunctions_1.createTweet)(tweetMock_1.default.validTweet, registeredUserId, userToken);
            tweetId = tweetResult.body.id;
        }));
        it('should return status code 200 with valid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getLikedTweets)(registeredUserId, userToken);
            expect(result.statusCode).toBe(200);
        }));
        it('should return an array of liked tweets with valid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertestsFunctions_1.likeTweet)(registeredUserId, tweetId, userToken);
            const result = yield (0, supertestsFunctions_1.getLikedTweets)(registeredUserId, userToken);
            const expectedResult = {
                User: {
                    id: registeredUserId,
                    name: userCredentials_1.default.validCredentials.name,
                },
                Tweets: [{
                        id: tweetId,
                        likes: 1,
                        tweet: tweetMock_1.default.validTweet,
                    },
                ],
            };
            expect(result.body).toStrictEqual(expectedResult);
        }));
        it('should return an empty array if there is no liked tweets', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getLikedTweets)(registeredUserId, userToken);
            const expectedResult = {
                User: {
                    id: registeredUserId,
                    name: userCredentials_1.default.validCredentials.name,
                },
                Tweets: [],
            };
            expect(result.body).toStrictEqual(expectedResult);
        }));
        it('should return status code 401 with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getLikedTweets)(registeredUserId, userCredentials_1.default.invalidUserToken);
            expect(result.statusCode).toBe(401);
        }));
        it('should return status code 404 with invalid user ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertestsFunctions_1.getLikedTweets)(userCredentials_1.default.invalidUserId, userToken);
            expect(result.statusCode).toBe(404);
        }));
    });
});
