/* eslint-disable no-undef */
// import request from 'supertest';
// import app from '../../src/app';

// import tweetMock from './mock/tweetMock';
// import userCredentials from './mock/userCredentials';

// const truncate = require('../utils/truncateDb');

// let userToken: string;

// describe('Test tweet router', () => {
//   describe('POST: /create', () => {
//     beforeAll(async () => {
//       await truncate();
//       await truncate();
//       const r = await request(app)
//         .post('/user/create')
//         .set('Accept', 'application/json')
//         .send(userCredentials.validCredentials);
//       console.log(r.body);

//       const res = await request(app)
//         .post('/user/login')
//         .set('Accept', 'application/json')
//         .send(userCredentials.validCredentials);
//       userToken = res.body;
//     });

//     it('should return status code 201 with valid tweet and token', async () => {
//       const result = await request(app)
//         .post('/tweet/create')
//         .set('Accept', 'application/json')
//         .set('Authorization', userToken)
//         .send({ tweet: tweetMock.validTweet });

//       console.log(result.body);
//       console.log(userToken);
//       expect(result.statusCode).toBe(201);
//     });
//   });
// });
