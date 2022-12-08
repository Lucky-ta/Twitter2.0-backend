/* eslint-disable no-undef */
import signToken from '../../api/app/services/accountSecurity/token/JwtFunctions';
import userCredentials from '../mock/userCredentials';
import tokenValidationMiddleware from '../mock/validateMocks';

const invalidSecret = 'invalidSecret';
const testSecret = 'testSecret';
let token: string;

describe('Test validate token functions', () => {
  describe('JWT sign function (SERVICE)', () => {
    it('should return a token access of string type with valid credentials', () => {
      const result = signToken(userCredentials.validCredentials, testSecret);
      expect(typeof result).toBe('string');
    });
  });

  describe('JWT verify function (MIDDLEWARE)', () => {
    beforeEach(() => {
      token = signToken(userCredentials.validCredentials, testSecret);
    });

    it('should return user data with valid secret and token', () => {
      const expectedResult = {
        id: 1,
        name: '',
        email: '',
        iat: '',
        exp: '',
      };

      const result = tokenValidationMiddleware(token, testSecret);
      expect(Object.keys(result)).toMatchObject(Object.keys(expectedResult));
    });

    it('should return a error message with invalid secret', () => {
      const expectedResult = { message: 'invalid signature' };

      const result = tokenValidationMiddleware(token, invalidSecret);
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
