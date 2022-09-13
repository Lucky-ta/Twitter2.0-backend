/* eslint-disable no-undef */
const { User } = require('../../src/database/models');

describe('Authentication', () => {
  it('create user test', async () => {
    const user = await User.create({ name: 'Lucas', email: 'FHASAF@gmail.com', password: '123456789' });
    console.log(user);

    expect(user.email).toBe('FHASAF@gmail.com');
  });
});
