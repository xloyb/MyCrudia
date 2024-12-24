import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '@controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
