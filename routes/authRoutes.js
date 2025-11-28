import { Router } from 'express';
import { login, register, verify2fa } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-2fa', verify2fa);

export default router;

