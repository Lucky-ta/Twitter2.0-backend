/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import {
  editName, excludeAccount, loginUserAccount, postUser,
} from '../services/userService';

const services = {
  editName, excludeAccount, loginUserAccount, postUser,
};

type serviceFunctionsResponseShape = {
  status: number,
  data: any
}

interface serviceShape {
  editName: (userId: number, name: string) => Promise<serviceFunctionsResponseShape>;
  excludeAccount: (accountId: number) => Promise<serviceFunctionsResponseShape>;
  loginUserAccount: (body: any) => Promise<serviceFunctionsResponseShape>;
  postUser: (body: any) => Promise<serviceFunctionsResponseShape>;
}

class UserController {
  private service: serviceShape;

  constructor(service: any) {
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUserName = this.editUserName.bind(this);
    this.service = service;
  }

  async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await this.service.postUser(body);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await this.service.loginUserAccount(body);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsedNumber = Number(id);
      const result = await this.service.excludeAccount(parsedNumber);
      return res.status(result.status).end();
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }

  async editUserName(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const parsedId = Number(id);

      const result = await this.service.editName(parsedId, name);
      return res.status(result.status).json(result.data);
    } catch (e: any) {
      return res.status(500).json(e.message);
    }
  }
}

export default new UserController(services);
