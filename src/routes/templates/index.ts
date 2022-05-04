import { Router } from 'express';
import { TemplateHandlers } from './templatesHandlers';
import { TemplateModel } from 'models/template';
import { TemplateService } from 'services/templateService';

const router = Router();
const templateService = new TemplateService(TemplateModel);
const templateHandlers = new TemplateHandlers(templateService);

router.get('/view', templateHandlers.findByUserId);
router.get('/create', templateHandlers.getCreatePage);
router.post('/create', templateHandlers.create);

export default router;
