/* eslint-disable no-undef */
import { hashPassword, passwordValidation } from '../../src/app/services/accountSecurity/bycrypt/bycryptFunctions';

const passwordTest = '123456';
let passwordInDatabase: string;

describe('Test crypt password functions', () => {
  describe('Test has password function', () => {
    it('should return a hashed password given a password', async () => {
      const result = await hashPassword(passwordTest);
      expect(result).not.toStrictEqual(passwordTest);
    });
    it('should return a hashed password of type string given a password', async () => {
      const result = await hashPassword(passwordTest);
      expect(typeof result).toBe('string');
    });
  });

  describe('Test password validation function', () => {
    beforeEach(async () => {
      passwordInDatabase = await hashPassword(passwordTest);
    });

    it('should return True given a valid password', async () => {
      const userPasswordTest = { password: passwordInDatabase };

      const result = await passwordValidation(passwordTest, userPasswordTest);
      expect(result).toBe(true);
    });

    it('should return False given a invalid password', async () => {
      const userPasswordTest = { password: '123' };

      const result = await passwordValidation(passwordTest, userPasswordTest);
      expect(result).toBe(false);
    });
  });
});
