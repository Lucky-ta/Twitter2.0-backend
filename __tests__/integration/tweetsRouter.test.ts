import { createUser, signInUser } from '../utils/supertestsFunctions';
import userCredentials from './mock/userCredentials';

/* eslint-disable no-undef */
const truncate = require('../utils/truncateDb');

let userToken: string;
let registeredUserId: number;

describe('Test tweet router', () => {
  describe('POST: /tweet/create/:userId', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);

      userToken = loginResponse.body;
      registeredUserId = createResponse.body.id;
    });

    it('should return status code 201 with valid token and tweet', () => {});
    it('should return the posted tweet with valid token and tweet', () => {});
    it('should return status code 404 with invalid token', () => {});
    it('should return status code 404 with invalid tweet (empty tweet)', () => {});
  });
  describe('GET: /tweet', () => {
    it('should return status code 200 with valid token', () => {});
    it('should return all tweets in database with valid token', () => {});
    it('should return an ampty array if there is no tweets in database', () => {});
    it('should return status code 404 with invalid token', () => {});
    it('should return invalid token error message with invalid token', () => {});
  });
  describe('GET: /tweet/:userId', () => {
    it('should return status code 200 with valid token and user ID', () => {});
    it('should return all tweets by user ID with valid token and ID', () => {});
    it('should return status code 404 with invalid token', () => {});
    it('should return status code 404 with invalid user ID', () => {});
    it('should return invalid action error message with invalid user ID', () => {});
  });
  describe('DELETE: /tweet/:id', () => {
    it('should return status code 200 with valid token and user ID', () => {});
    it('should return status code 404 with invalid token', () => {});
    it('should return status code 404 with invalid user ID', () => {});
    it('should return invalid action error message with invalid user ID', () => {});
  });
});
