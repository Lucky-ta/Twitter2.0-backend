/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import userErrorsMiddlweares from '../../src/app/middlewares/errorMessages/userErrorMessages';
import validateErrors from '../../src/app/middlewares/errorMessages/validateError';
import userErrors from '../../src/app/services/errorMessages/userMessages';
import clearDatabase from '../utils/truncateDb';
import userCredentials from './userMock/userCredentials';

const { User } = require('../../src/database/models');

let userToken: any;

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
    beforeAll(async () => {
      await clearDatabase(User);
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

  describe('PUT: /edit/:id', () => {
    beforeEach(async () => {
      await clearDatabase(User);
      await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      const res = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);
      userToken = res.body;
    });

    it('should return status code 200 with a valid new user name', async () => {
      const result = await request(app)
        .put('/user/edit/4')
        .set('Accept', 'application/json')
        .set('Authorization', userToken)
        .send({ name: 'Billy' });

      expect(result.statusCode).toBe(200);
    });

    it('should return status code 404 with a invalid new user name', async () => {
      const result = await request(app)
        .put('/user/edit/4')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ name: 'Lu' });

      expect(result.statusCode).toBe(404);
    });

    it('should return invalid action error with a invalid user id', async () => {
      const result = await request(app)
        .put('/user/edit/2')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .send({ name: 'Billy' });

      expect(result.body).toStrictEqual(validateErrors.actionError);
    });
  });

  describe('DELETE: /exclude/:id', () => {
    beforeAll(async () => {
      await clearDatabase(User);
      await request(app)
        .post('/user/create')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);

      const res = await request(app)
        .post('/user/login')
        .set('Accept', 'application/json')
        .send(userCredentials.validCredentials);
      userToken = res.body;
    });

    it('should return status code 200 with valid token', async () => {
      const result = await request(app)
        .delete('/user/exclude/7')
        .set('Accept', 'application/json')
        .set('Authorization', userToken);

      expect(result.statusCode).toBe(200);
    });

    it('should return status code 404 with invalid token', async () => {
      const invalidToken: string = '1234';

      const result = await request(app)
        .delete('/user/exclude/7')
        .set('Accept', 'application/json')
        .set('Authorization', invalidToken);

      expect(result.statusCode).toBe(401);
    });

    it('should return status code 404 with invalid user ID', async () => {
      const result = await request(app)
        .delete('/user/exclude/5')
        .set('Accept', 'application/json')
        .set('Authorization', userToken);

      expect(result.statusCode).toBe(404);
    });
  });
});
