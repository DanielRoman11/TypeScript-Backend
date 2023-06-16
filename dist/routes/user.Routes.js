"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_Controller_1 = require("../controllers/user.Controller");
const router = (0, express_1.Router)();
router.post("/register", user_Controller_1.createUser);
router.post("/login", user_Controller_1.login);
exports.default = router;
