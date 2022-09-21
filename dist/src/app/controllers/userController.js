"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
class UserController {
    constructor(service) {
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUserName = this.editUserName.bind(this);
        this.service = service;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const result = yield this.service.postUser(body);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const result = yield this.service.loginUserAccount(body);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const parsedNumber = Number(id);
                const result = yield this.service.excludeAccount(parsedNumber);
                return res.status(result.status).end();
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
    editUserName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name } = req.body;
                const parsedId = Number(id);
                const result = yield this.service.editName(parsedId, name);
                return res.status(result.status).json(result.data);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        });
    }
}
const services = {
    editName: userService_1.editName, excludeAccount: userService_1.excludeAccount, loginUserAccount: userService_1.loginUserAccount, postUser: userService_1.postUser,
};
exports.default = new UserController(services);
