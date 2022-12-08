import express, { Express } from 'express';
import cors from 'cors';
import tweetRouter from './app/routes/tweetRouter';
import userRouter from './app/routes/userRouter';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const corsOptions = {
  origin: 'https://twitter-clone-bac-kend.herokuapp.com/',
  optionsSuccessStatus: 200,
};

const app: Express = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/tweet', tweetRouter);

export default app;
