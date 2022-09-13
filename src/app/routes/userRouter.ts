import { Router } from 'express';
import {
  createUser,
  deleteUser,
  editUserName,
  loginUser,
} from '../controllers/userController';
import { tokenValidation, userActionValidation } from '../middlewares/tokenMiddleware';
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

userRouter.put(
  '/edit/:id',
  nameValidation,
  tokenValidation,
  userActionValidation,

  editUserName,
);

userRouter.delete(
  '/exclude/:id',
  tokenValidation,
  userActionValidation,

  deleteUser,
);

export default userRouter;
