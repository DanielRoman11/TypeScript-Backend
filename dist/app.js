"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_Routes_1 = __importDefault(require("./routes/user.Routes"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./db/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//* Conexión a DB
(0, db_1.default)();
//* Middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
//* Routes
app.use("/api", user_Routes_1.default);
exports.default = app;
