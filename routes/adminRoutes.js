import { Router } from 'express';
import { adminGuard, authGuard } from '../middleware/auth.js';
import { blockUser, listTransactions, listUsers } from '../controllers/adminController.js';

const router = Router();

router.use(authGuard, adminGuard);
router.get('/users', listUsers);
router.get('/transactions', listTransactions);
router.patch('/user/:id/block', blockUser);

export default router;

