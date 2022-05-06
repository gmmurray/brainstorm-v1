import { Router } from 'express';
import homeRouter from './home';
import landingRouter from './landing';
import { requiresAuth } from 'express-openid-connect';
import templatesRouter from './templates';

const router = Router();

router.use('/landing', landingRouter);
router.use('/templates', requiresAuth(), templatesRouter);
router.use('*', requiresAuth(), homeRouter);

export default router;
