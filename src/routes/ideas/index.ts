import { IdeaModel } from '../../models/idea';
import { IdeaService } from '../../services/ideaService';
import { IdeasHandlers } from './ideasHandler';
import { Router } from 'express';
import { TemplateModel } from '../../models/template';
import { TemplateService } from '../../services/templateService';

const router = Router();
const ideaService = new IdeaService(IdeaModel);
const templateService = new TemplateService(TemplateModel);
const ideaHandlers = new IdeasHandlers(ideaService, templateService);

router.get('/create', ideaHandlers.createView);
router.post('/create', ideaHandlers.createOperation);
router.get('/view', ideaHandlers.updateView);
router.post('/update', ideaHandlers.updateOperation);
router.delete('/', ideaHandlers.deleteOperation);
router.get('*', ideaHandlers.ideasView);

export default router;
