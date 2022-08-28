import { Request, Response } from 'express';
import { excludeAccount, loginUserAccount, postUser } from '../services/userService';

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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedNumber = Number(id);
    const result = await excludeAccount(parsedNumber);
    return res.status(result.status).end();
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export { createUser, loginUser, deleteUser };
