import { Router } from 'express';
import { createUser, login } from '../controllers/user.Controller';

const router: Router = Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;