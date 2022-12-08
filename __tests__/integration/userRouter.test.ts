/* eslint-disable no-undef */
import userErrorsMiddlweares from '../../api/app/middlewares/errorMessages/userErrorMessages';
import validateErrors from '../../api/app/middlewares/errorMessages/validateError';
import userErrors from '../../api/app/services/errorMessages/userMessages';
import {
  createUser,
  deleteUser,
  editUserName,
  getUserById,
  signInUser,
} from '../utils/supertestsFunctions';
import userCredentials from '../mock/userCredentials';

const truncate = require('../utils/truncateDb');

let userToken: string;
let registeredUserId: string;

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

  describe('PUT: /user/edit/:id', () => {
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

  describe('DELETE: /user/exclude/:id', () => {
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

      const result = await deleteUser(parsedId, userCredentials.invalidUserToken);
      expect(result.statusCode).toBe(401);
    });

    it('should return status code 404 with invalid user ID', async () => {
      const userId = '5';

      const result = await deleteUser(userId, userToken);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('GET: /user/:userId', () => {
    beforeEach(async () => {
      await truncate();
      const createResponse = await createUser(userCredentials.validCredentials);

      registeredUserId = createResponse.body.id;
    });
    it('should return status code 200 with valid user ID', async () => {
      const result = await getUserById(registeredUserId);
      expect(result.statusCode).toBe(200);
    });
    it('should return user data with valid user ID', async () => {
      const result = await getUserById(registeredUserId);
      const expectResponse = {
        id: registeredUserId,
        name: userCredentials.validCredentials.name,
        email: userCredentials.validCredentials.email,
      };

      expect(result.body).toStrictEqual(expectResponse);
    });
    it('should return status code 404 with a invalid user ID', async () => {
      const invalidUserId = '1000';
      const result = await getUserById(invalidUserId);

      expect(result.statusCode).toStrictEqual(404);
    });
  });
});
