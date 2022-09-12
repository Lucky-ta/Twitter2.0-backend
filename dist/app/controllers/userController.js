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
exports.editUserName = exports.deleteUser = exports.loginUser = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const result = yield (0, userService_1.postUser)(body);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const result = yield (0, userService_1.loginUserAccount)(body);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedNumber = Number(id);
        const result = yield (0, userService_1.excludeAccount)(parsedNumber);
        return res.status(result.status).end();
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.deleteUser = deleteUser;
const editUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedId = Number(id);
        const { name } = req.body;
        const result = yield (0, userService_1.editName)(parsedId, name);
        return res.status(result.status).json(result.data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
});
exports.editUserName = editUserName;
