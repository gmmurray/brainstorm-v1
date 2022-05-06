import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AuthUser } from '../../types/user';
import { ITemplateService } from '../../types/services/ITemplateService';
import { Template } from '../../models/template';
import { pageNames } from '../../constants/pageNames';
import { pageWithData } from '../shared/pageWithData';

export class TemplateHandlers {
  private _templateService: ITemplateService;

  constructor(templateService: ITemplateService) {
    this._templateService = templateService;
  }

  templatesView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);
    const templates = await this._templateService.findByUserId(user.sub);

    return pageWithData(res, pageNames.viewTemplates, user, { templates });
  };

  createView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    return pageWithData(res, pageNames.createTemplate, user);
  };

  createOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const template = await this._templateService.create(user.sub, req.body);

    return res.status(StatusCodes.CREATED).json({ templateId: template.id });
  };

  updateView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const { templateId } = req.query;
    const template = await this._templateService.findById(
      user.sub,
      templateId as string,
    );

    return pageWithData(res, pageNames.updateTemplate, user, { template });
  };

  updateOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const updates = req.body as Template;
    await this._templateService.update(user.sub, updates);

    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  };

  deleteOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const { templateId } = req.query;

    await this._templateService.delete(user.sub, templateId as string);

    return res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  };
}
