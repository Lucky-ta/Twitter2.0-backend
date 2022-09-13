import { Request, Response } from 'express';
import {
  editName, excludeAccount, loginUserAccount, postUser,
} from '../services/userService';
import { serviceUserShape } from './types/controllersTypes';

class UserController {
  private service: serviceUserShape;

  constructor(service: serviceUserShape) {
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

const services = {
  editName, excludeAccount, loginUserAccount, postUser,
};

export default new UserController(services);
