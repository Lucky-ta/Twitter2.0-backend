import {
  createTweet, createUser, deleteTweetById, getAllTweets, getTweetsByUserId, signInUser,
} from '../utils/supertestsFunctions';
import userCredentials from './mock/userCredentials';
import tweetMock from './mock/tweetMock';
import validateErrors from '../../src/app/middlewares/errorMessages/validateError';

/* eslint-disable no-undef */
const truncate = require('../utils/truncateDb');

let userToken: string;
let registeredUserId: string;
let tweetId: string;
let tweetUserId: number;

describe('Test tweet router', () => {
  describe('POST: /tweet/create/:userId', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);

      userToken = loginResponse.body;
      registeredUserId = createResponse.body.id;
    });

    it('should return status code 201 with valid token and tweet', async () => {
      const result = await createTweet(tweetMock.validTweet, registeredUserId, userToken);
      expect(result.statusCode).toBe(201);
    });

    it('should return the posted tweet with valid token and tweet', async () => {
      const result = await createTweet(tweetMock.validTweet, registeredUserId, userToken);

      const expectedResult = {
        id: result.body.id,
        tweet: tweetMock.validTweet,
        userId: registeredUserId,
      };
      expect(result.body).toStrictEqual(expectedResult);
    });

    it('should return status code 404 with invalid token', async () => {
      const invalidToken = '1234';

      const result = await createTweet(tweetMock.validTweet, registeredUserId, invalidToken);
      expect(result.statusCode).toStrictEqual(401);
    });

    it('should return status code 404 with invalid tweet (empty tweet)', async () => {
      const result = await createTweet(tweetMock.invalidTweet, registeredUserId, userToken);
      expect(result.statusCode).toStrictEqual(404);
    });
  });
  describe('GET: /tweet', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);
      userToken = loginResponse.body;
      registeredUserId = createResponse.body.id;

      const tweetResult = await createTweet(tweetMock.validTweet, registeredUserId, userToken);

      tweetId = tweetResult.body.id;
    });

    it('should return status code 200 with valid token', async () => {
      const result = await getAllTweets(userToken);
      expect(result.statusCode).toBe(200);
    });
    it('should return an array of tweets with valid token', async () => {
      const expectedTweetResponse = {
        User: {
          id: registeredUserId,
          name: userCredentials.validCredentials.name,
        },
        id: tweetId,
        likes: 0,
        tweet: tweetMock.validTweet,
      };

      const expectedResult = [expectedTweetResponse];

      const result = await getAllTweets(userToken);
      expect(result.body).toHaveLength(1);
      expect(result.body).toStrictEqual(expectedResult);
    });
    it('should return an ampty array if there is no tweets in database', async () => {
      await truncate();

      const result = await getAllTweets(userToken);
      expect(result.body).toHaveLength(0);
    });
    it('should return status code 401 with invalid token', async () => {
      const invalidToken = '1234';

      const result = await getAllTweets(invalidToken);
      expect(result.statusCode).toBe(401);
    });
    it('should return malformed token error message with invalid token', async () => {
      const expectedResult = { message: 'jwt malformed' };
      const invalidToken = '1234';

      const result = await getAllTweets(invalidToken);
      expect(result.body).toStrictEqual(expectedResult);
    });
  });
  describe('GET: /tweet/:userId', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);
      userToken = loginResponse.body;
      registeredUserId = createResponse.body.id;

      const tweetResult = await createTweet(tweetMock.validTweet, registeredUserId, userToken);

      tweetId = tweetResult.body.id;
      tweetUserId = tweetResult.body.userId;
    });

    it('should return status code 200 with valid token and user ID', async () => {
      const result = await getTweetsByUserId(registeredUserId, userToken);
      expect(result.statusCode).toBe(200);
    });
    it('should return all tweets by user ID with valid token and ID', async () => {
      const result = await getTweetsByUserId(registeredUserId, userToken);

      const expectedTweetResponse = {
        id: tweetId,
        likes: 0,
        tweet: tweetMock.validTweet,
        userId: tweetUserId,
      };

      const expectedResult = [expectedTweetResponse];
      expect(result.body).toHaveLength(1);
      expect(result.body).toStrictEqual(expectedResult);
    });
    it('should return status code 401 with invalid token', async () => {
      const invalidToken = '1234';

      const result = await getTweetsByUserId(registeredUserId, invalidToken);
      expect(result.statusCode).toBe(401);
    });
    it('should return status code 404 with invalid user ID', async () => {
      const invalidUserId = '20';

      const result = await getTweetsByUserId(invalidUserId, userToken);
      expect(result.statusCode).toBe(404);
    });
    it('should return invalid action error message with invalid user ID', async () => {
      const invalidUserId = '20';

      const result = await getTweetsByUserId(invalidUserId, userToken);
      expect(result.body).toBe(validateErrors.actionError);
    });
  });
  describe('DELETE: /tweet/:id', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);
      userToken = loginResponse.body;
      registeredUserId = createResponse.body.id;

      const tweetResult = await createTweet(tweetMock.validTweet, registeredUserId, userToken);

      tweetId = tweetResult.body.id;
      tweetUserId = tweetResult.body.userId;
    });

    it('should return status code 200 with valid token and user ID', async () => {
      const result = await deleteTweetById(tweetId, registeredUserId, userToken);
      expect(result.statusCode).toBe(200);
    });

    it('should return an empty array after delete tweet with valid token and user ID', async () => {
      await deleteTweetById(tweetId, registeredUserId, userToken);

      const result = await getTweetsByUserId(registeredUserId, userToken);
      expect(result.body).toHaveLength(0);
    });

    it('should return status code 401 with invalid token', async () => {
      const invalidToken = '12343';

      const result = await deleteTweetById(tweetId, registeredUserId, invalidToken);
      expect(result.statusCode).toBe(401);
    });
    it('should return status code 404 with invalid user ID', async () => {
      const invalidUserID = '20';

      const result = await deleteTweetById(tweetId, invalidUserID, userToken);
      expect(result.statusCode).toBe(404);
    });
    it('should return invalid action error message with invalid user ID', async () => {
      const invalidUserID = '20';

      const result = await deleteTweetById(tweetId, invalidUserID, userToken);
      expect(result.body).toBe(validateErrors.actionError);
    });
  });
});
