import { Router } from 'express';
import homeRouter from './home';
import landingRouter from './landing';
import { requiresAuth } from 'express-openid-connect';
import templatesRouter from './templates';

const router = Router();

router.use('/templates', requiresAuth(), templatesRouter);
router.use('/', landingRouter);
router.use('*', requiresAuth(), homeRouter);

export default router;
