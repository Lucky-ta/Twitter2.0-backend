import { Request, Response } from 'express';
import { loginUserAccount, postUser } from '../services/userService';

const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await postUser(body);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await loginUserAccount(body);
    return res.status(result.status).json(result.data);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export { createUser, loginUser };
