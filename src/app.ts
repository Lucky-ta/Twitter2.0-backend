import express, { Express } from 'express';
import userRouter from './app/routes/userRouter';

const app: Express = express();

app.use(express.json());

app.use('/user', userRouter);

export default app;
