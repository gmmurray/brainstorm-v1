import { Router } from 'express';
import { TemplateHandlers } from './templatesHandlers';
import { TemplateModel } from '../../models/template';
import { TemplateService } from '../../services/templateService';

const router = Router();
const templateService = new TemplateService(TemplateModel);
const templateHandlers = new TemplateHandlers(templateService);

router.get('/create', templateHandlers.createView);
router.post('/create', templateHandlers.createOperation);
router.get('/view', templateHandlers.updateView);
router.post('/update', templateHandlers.updateOperation);
router.delete('/', templateHandlers.deleteOperation);
router.get('*', templateHandlers.templatesView);

export default router;
