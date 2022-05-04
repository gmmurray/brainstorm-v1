import { Router } from 'express';
import { home } from './handlers';

const router = Router();

router.get('/', home);

export default router;
