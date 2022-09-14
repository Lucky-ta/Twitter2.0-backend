/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import userErrorsMiddlweares from '../../src/app/middlewares/errorMessages/userErrorMessages';
import validateErrors from '../../src/app/middlewares/errorMessages/validateError';
import userErrors from '../../src/app/services/errorMessages/userMessages';
import userCredentials from './mock/userCredentials';

const truncate = require('../utils/truncateDb');

let userToken: string;
let registeredUserId: number;

type TestUserCredentialsShape = {
  name?: string;
  email?: string;
  password?: string;
}

const createUser = async (user: TestUserCredentialsShape) => {
  const response = await request(app)
    .post('/user/create')
    .set('Accept', 'application/json')
    .send(user);
  return response;
};

const signInUser = async (user: TestUserCredentialsShape) => {
  const result = await request(app)
    .post('/user/login')
    .set('Accept', 'application/json')
    .send(user);
  return result;
};

const editUserName = async (userId: string, newName: string, accessToken: string) => {
  const result = await request(app)
    .put(`/user/edit/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', accessToken)
    .send({ name: newName });
  return result;
};

const deleteUser = async (userId: string, accessToken: string) => {
  const result = await request(app)
    .delete(`/user/exclude/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', accessToken);
  return result;
};

describe('Test user router', () => {
  beforeAll(async () => {
    await truncate();
  });
  describe('POST: /user/create', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('should return status code 201 with valid credentials', async () => {
      const response = await createUser(userCredentials.validCredentials);
      expect(response.statusCode).toBe(201);
    });

    it('should return user data with valid credentials', async () => {
      const response = await createUser(userCredentials.validCredentials);
      const { id } = response.body;

      const expectResponse = { email: 'lucmaieski@gmail.com', id, name: 'Lucas' };
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return status code 404 with valid credentials', async () => {
      const response = await createUser(userCredentials.credentialsWithoutPass);
      expect(response.statusCode).toBe(404);
    });

    it('should return a error message with invalid credentials (no email)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsWithoutemail);
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (no password)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsWithoutPass);
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (no name)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsWithoutname);
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty name)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsEmptytname);
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty password)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsEmptyPass);
      expect(response.body).toStrictEqual(expectResponse);
    });

    it('should return a error message with invalid credentials (empty email)', async () => {
      const expectResponse = { message: userErrorsMiddlweares.requiredError };

      const response = await createUser(userCredentials.credentialsEmptyemail);
      expect(response.body).toStrictEqual(expectResponse);
    });
  });

  describe('POST: /user/login', () => {
    beforeAll(async () => {
      await truncate();
      await createUser(userCredentials.validCredentials);
    });

    it('should return status code 200 with valid credentials', async () => {
      const result = await signInUser(userCredentials.validCredentials);
      expect(result.statusCode).toBe(200);
    });

    it('should return a token access with valid credentials', async () => {
      const result = await signInUser(userCredentials.validCredentials);
      expect(typeof result.body).toBe('string');
    });

    it('should return status code 404 with invalid credentials', async () => {
      const result = await signInUser(userCredentials.credentialsEmptyPass);
      expect(result.statusCode).toBe(404);
    });

    it('should return a error message with invalid credentials (invalid password)', async () => {
      const expectedResponse = { message: userErrors.passwordError };

      const result = await signInUser(userCredentials.credentialsInvalidPass);
      expect(result.body).toStrictEqual(expectedResponse);
    });

    it('should return a error message with invalid credentials (invalid email)', async () => {
      const expectedResponse = { message: userErrors.userError };

      const result = await signInUser(userCredentials.credentialsInvalidEmail);
      expect(result.body).toStrictEqual(expectedResponse);
    });
  });

  describe('PUT: /edit/:id', () => {
    beforeEach(async () => {
      await truncate();
      const createResult = await createUser(userCredentials.validCredentials);
      const loginReponse = await signInUser(userCredentials.validCredentials);

      registeredUserId = createResult.body.id;
      userToken = loginReponse.body;
    });

    it('should return status code 200 with a valid new user name', async () => {
      const parsedId = String(registeredUserId);
      const newName = 'Billy';

      const result = await editUserName(parsedId, newName, userToken);
      expect(result.statusCode).toBe(200);
    });

    it('should return status code 404 with a invalid new user name', async () => {
      const parsedId = String(registeredUserId);
      const newName = 'Lu';

      const result = await editUserName(parsedId, newName, userToken);
      expect(result.statusCode).toBe(404);
    });

    it('should return invalid action error with a invalid user id', async () => {
      const userId = '4';
      const newName = 'Billy';

      const result = await editUserName(userId, newName, userToken);
      expect(result.body).toStrictEqual(validateErrors.actionError);
    });
  });

  describe('DELETE: /exclude/:id', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);
      const loginResponse = await signInUser(userCredentials.validCredentials);

      registeredUserId = createResponse.body.id;
      userToken = loginResponse.body;
    });

    it('should return status code 200 with valid token', async () => {
      const parsedId = String(registeredUserId);

      const result = await deleteUser(parsedId, userToken);
      expect(result.statusCode).toBe(200);
    });

    it('should return status code 404 with invalid token', async () => {
      const parsedId = String(registeredUserId);
      const invalidToken: string = '1234';

      const result = await deleteUser(parsedId, invalidToken);
      expect(result.statusCode).toBe(401);
    });

    it('should return status code 404 with invalid user ID', async () => {
      const userId = '5';

      const result = await deleteUser(userId, userToken);
      expect(result.statusCode).toBe(404);
    });
  });
});
