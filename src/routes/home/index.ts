import { HomeHandler } from './homeHandler';
import { IdeaModel } from '../../models/idea';
import { IdeaService } from '../../services/ideaService';
import { Router } from 'express';
import { TemplateModel } from '../../models/template';
import { TemplateService } from '../../services/templateService';

const router = Router();
const templateService = new TemplateService(TemplateModel);
const ideaService = new IdeaService(IdeaModel);
const homeHandler = new HomeHandler(templateService, ideaService);

router.get('*', homeHandler.view);

export default router;
