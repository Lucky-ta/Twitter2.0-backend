import { NextFunction, Request, Response } from 'express';
import userErrorsMiddlweares from './errorMessages/userErrorMessages';

const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  if (!email) {
    return res.status(404).json({ message: userErrorsMiddlweares.requiredError });
  }

  if (!isEmailValid) {
    return res.status(404).json({ message: userErrorsMiddlweares.emailError });
  } return next();
};

const nameValidation = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).json({ message: userErrorsMiddlweares.requiredError });
  }

  const isNameValid = name.length >= 3;
  if (!isNameValid) {
    return res.status(404).json({ message: userErrorsMiddlweares.nameError });
  } return next();
};

const passwordValidation = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(404).json({ message: userErrorsMiddlweares.requiredError });
  }

  const isPasswordValid = password.length >= 3;
  if (!isPasswordValid) {
    return res.status(404).json({ message: userErrorsMiddlweares.passwordError });
  } return next();
};

export { emailValidation, nameValidation, passwordValidation };
