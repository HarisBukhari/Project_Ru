import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.patch('/:id/status', userController.updateUserStatus);

export default router;