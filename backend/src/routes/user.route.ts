import { Router } from 'express';
import { getAllUser } from '../controllers/user.controller';
const router = Router();

router.get('/user/v1', getAllUser as any);

export default router;
