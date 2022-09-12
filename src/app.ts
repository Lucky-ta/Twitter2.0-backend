import express, { Express } from 'express';
import cors from 'cors';
import tweetRouter from './app/routes/tweetRouter';
import userRouter from './app/routes/userRouter';
import likedTweetsRouter from './app/routes/likedTweets';

const app: Express = express();

app.use(express.json());

app.use(cors());

app.use('/user', userRouter);
app.use('/tweet', tweetRouter);
app.use('/likedTweets', likedTweetsRouter);

export default app;
