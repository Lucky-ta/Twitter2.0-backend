import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { emailValidation, nameValidation, passwordValidation } from '../middlewares/userMiddlewares';

const userRouter = Router();

userRouter.post(
  '/create',
  emailValidation,
  nameValidation,
  passwordValidation,

  createUser,
);

export default userRouter;
