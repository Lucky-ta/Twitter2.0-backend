import { Router } from 'express';
import UserController from '../controllers/userController';
import { tokenValidation, userActionValidation } from '../middlewares/tokenMiddleware';
import { emailValidation, nameValidation, passwordValidation } from '../middlewares/userMiddlewares';

const userRouter = Router();

userRouter.post(
  '/create',
  emailValidation,
  nameValidation,
  passwordValidation,

  UserController.createUser,
);

userRouter.post(
  '/login',
  emailValidation,
  passwordValidation,

  UserController.loginUser,
);

userRouter.put(
  '/edit/:id',
  nameValidation,
  tokenValidation,
  userActionValidation,

  UserController.editUserName,
);

userRouter.get(
  '/:userId',

  UserController.getUserById,
);

userRouter.delete(
  '/exclude/:id',
  tokenValidation,
  userActionValidation,

  UserController.deleteUser,
);

export default userRouter;
