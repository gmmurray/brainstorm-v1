import { Router } from 'express';
import homeRouter from './home';
import landingRouter from './landing';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

router.use('/landing', landingRouter);
router.use('*', requiresAuth(), homeRouter);

export default router;
