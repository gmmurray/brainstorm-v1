import { Router } from 'express';
import homeRouter from './home';
import ideasRouter from './ideas';
import landingRouter from './landing';
import { requiresAuth } from 'express-openid-connect';
import templatesRouter from './templates';

const router = Router();

router.use('/templates', requiresAuth(), templatesRouter);
router.use('/ideas', requiresAuth(), ideasRouter);
router.use('/', landingRouter);
router.use('*', requiresAuth(), homeRouter);

export default router;
