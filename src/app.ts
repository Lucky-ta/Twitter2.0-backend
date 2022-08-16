import express, { Express } from 'express';
import tweetRouter from './app/routes/tweetRouter';
import userRouter from './app/routes/userRouter';

const app: Express = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/tweet', tweetRouter);

export default app;
