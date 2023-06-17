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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.createUser = void 0;
require("dotenv/config");
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../libs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const userFind = yield User_1.default.findOne({ email: email });
        if (userFind)
            return res.status(400).json({ msg: "This email is already used" });
        const newUser = new User_1.default({
            username,
            email,
            password
        });
        const user = yield newUser.save();
        const token = yield (0, jwt_1.createJWT)({ id: user._id });
        res.cookie('_token', token);
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userFound = yield User_1.default.findOne({ email });
        if (!userFound)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = yield bcrypt_1.default.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = yield (0, jwt_1.createJWT)({ id: userFound._id });
        res.cookie('_token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
