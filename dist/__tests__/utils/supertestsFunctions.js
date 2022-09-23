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
exports.getUserById = exports.getLikedTweets = exports.likeTweet = exports.deleteTweetById = exports.getTweetsByUserId = exports.getAllTweets = exports.createTweet = exports.deleteUser = exports.editUserName = exports.signInUser = exports.createUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(user);
    return response;
});
exports.createUser = createUser;
const signInUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(user);
    return result;
});
exports.signInUser = signInUser;
const editUserName = (userId, newName, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .put(`/user/edit/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .send({ name: newName });
    return result;
});
exports.editUserName = editUserName;
const deleteUser = (userId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .delete(`/user/exclude/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.deleteUser = deleteUser;
const createTweet = (tweet, userId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .post(`/tweet/create/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken)
        .send({ tweet });
    return result;
});
exports.createTweet = createTweet;
const getAllTweets = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .get('/tweet/')
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.getAllTweets = getAllTweets;
const getTweetsByUserId = (userId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .get(`/tweet/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.getTweetsByUserId = getTweetsByUserId;
const deleteTweetById = (tweetId, userId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .delete(`/tweet/${tweetId}/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.deleteTweetById = deleteTweetById;
const likeTweet = (userId, tweetId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .post(`/tweet/like/${userId}/${tweetId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.likeTweet = likeTweet;
const getLikedTweets = (userId, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .get(`/tweet/liked/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', accessToken);
    return result;
});
exports.getLikedTweets = getLikedTweets;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, supertest_1.default)(app_1.default)
        .get(`/user/${userId}`)
        .set('Accept', 'application/json');
    return result;
});
exports.getUserById = getUserById;
