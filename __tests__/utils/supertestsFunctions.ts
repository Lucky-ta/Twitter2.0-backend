import request from 'supertest';
import app from '../../src/app';

type TestUserCredentialsShape = {
    name?: string;
    email?: string;
    password?: string;
}

export const createUser = async (user: TestUserCredentialsShape) => {
  const response = await request(app)
    .post('/user/create')
    .set('Accept', 'application/json')
    .send(user);
  return response;
};

export const signInUser = async (user: TestUserCredentialsShape) => {
  const result = await request(app)
    .post('/user/login')
    .set('Accept', 'application/json')
    .send(user);
  return result;
};

export const editUserName = async (userId: string, newName: string, accessToken: string) => {
  const result = await request(app)
    .put(`/user/edit/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', accessToken)
    .send({ name: newName });
  return result;
};

export const deleteUser = async (userId: string, accessToken: string) => {
  const result = await request(app)
    .delete(`/user/exclude/${userId}`)
    .set('Accept', 'application/json')
    .set('Authorization', accessToken);
  return result;
};
