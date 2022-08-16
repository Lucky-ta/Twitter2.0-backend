import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController';
import { emailValidation, nameValidation, passwordValidation } from '../middlewares/userMiddlewares';

const userRouter = Router();

userRouter.post(
  '/create',
  emailValidation,
  nameValidation,
  passwordValidation,

  createUser,
);

userRouter.post(
  '/login',
  emailValidation,
  passwordValidation,

  loginUser,
);

export default userRouter;
