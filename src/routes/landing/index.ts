import { Router } from 'express';
import { landing } from './handlers';

const router = Router();

router.get('/', landing);

export default router;
