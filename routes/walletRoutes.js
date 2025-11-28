import { Router } from 'express';
import { authGuard } from '../middleware/auth.js';
import {
  deposit,
  getHistory,
  getWallet,
  transfer,
  withdraw,
} from '../controllers/walletController.js';

const router = Router();

router.use(authGuard);
router.get('/', getWallet);
router.get('/history', getHistory);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/transfer', transfer);

export default router;

