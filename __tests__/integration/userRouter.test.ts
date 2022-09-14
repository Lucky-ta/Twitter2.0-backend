/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import userErrorsMiddlweares from '../../src/app/middlewares/errorMessages/userErrorMessages';
import userErrors from '../../src/app/services/errorMessages/userMessages';
import clearDatabase from '../utils/truncateDb';
import userCredentials from './userMock/userCredentials';

const { User } = require('../../src/database/models');

describe('Test user router', () => {
  describe('POST: /user/create', () => {
    beforeEach(async () => {
      await clearDatabase(User);
    });

    it('should return status code 201 with valid credentials', async () => {
      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      expect(response.statusCode).toBe(201);
    });

    it('should return user data with valid credentials', async () => {
      const expectResponse = {
        email: 'lucmaieski@gmail.com', id: 2, name: 'Lucas',
      };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return status code 404 with valid credentials', async () => {
      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsWithoutPass);

      expect(response.statusCode).toBe(404);
    });

    it('should return a error message with invalid credentials (no email)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsWithoutemail);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (no password)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsWithoutPass);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (no name)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsWithoutname);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty name)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsEmptytname);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty password)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsEmptyPass);

      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty email)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsEmptyemail);

      expect(response.body).toStrictEqual(expectResponse);
    });
  });

  describe('POST: /user/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);
    });

    it('should return status code 200 with valid credentials', async () => {
      const result = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      expect(result.statusCode).toBe(200);
    });

    it('should return a token access with valid credentials', async () => {
      const result = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      expect(typeof result.body).toBe('string');
    });

    it('should return status code 404 with invalid credentials', async () => {
      const result = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsEmptyPass);

      expect(result.statusCode).toBe(404);
    });

    it('should return a error message with invalid credentials (invalid password)', async () => {
      const expectedResponse = { message: userErrors.passwordError };

      const result = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsInvalidPass);

      expect(result.body).toStrictEqual(expectedResponse);
    });

    it('should return a error message with invalid credentials (invalid email)', async () => {
      const expectedResponse = { message: userErrors.userError };

      const result = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.credentialsInvalidEmail);

      expect(result.body).toStrictEqual(expectedResponse);
    });
  });
});
