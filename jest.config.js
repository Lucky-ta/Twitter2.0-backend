/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  bail: false,
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
};
