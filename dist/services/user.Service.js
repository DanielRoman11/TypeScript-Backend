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
exports.getErrorMessage = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../libs/jwt");
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = new Error('Invalid credentials');
        try {
            const foundUser = yield User_1.default.findOne({ email: user.email });
            if (!foundUser) {
                return error;
            }
            const isMatch = bcrypt_1.default.compareSync(user.password, foundUser.password);
            if (isMatch) {
                const token = (0, jwt_1.createJWT)({ id: foundUser._id });
                return { foundUser: { _id: String, name: String }, token: token };
            }
            else {
                return error;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
