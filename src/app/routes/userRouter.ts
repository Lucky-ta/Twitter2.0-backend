import { Router } from 'express';
import { createUser, deleteUser, loginUser } from '../controllers/userController';
import { tokenValidation } from '../middlewares/tweetMiddlewares';
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

userRouter.delete(
  '/login',
  tokenValidation,

  deleteUser,
);

export default userRouter;
