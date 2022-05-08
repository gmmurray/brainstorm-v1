import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AuthUser } from '../../types/user';
import { IIdeaService } from '../../types/services/IIdeaService';
import { ITemplateService } from '../../types/services/ITemplateService';
import { Idea } from '../../models/idea';
import { pageNames } from '../../constants/pageNames';
import { pageWithData } from '../shared/pageWithData';

export class IdeasHandlers {
  private _ideaService: IIdeaService;
  private _templateService: ITemplateService;

  constructor(ideaService: IIdeaService, templateService: ITemplateService) {
    this._ideaService = ideaService;
    this._templateService = templateService;
  }

  ideasView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const { templateId } = req.query ?? {};

    const ideas = templateId
      ? await this._ideaService.findByTemplateId(user.sub, templateId as string)
      : await this._ideaService.findByUserId(user.sub);

    return pageWithData(
      req,
      res,
      pageNames.viewIdeas,
      user,
      { ideas, templateId },
      '/ideas',
    );
  };

  createView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const availableTemplates = await this._templateService.findByUserId(
      user.sub,
    );

    return pageWithData(
      req,
      res,
      pageNames.createIdea,
      user,
      { templates: availableTemplates },
      '/ideas',
    );
  };

  createOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const idea = await this._ideaService.create(user.sub, req.body);

    return res.status(StatusCodes.CREATED).json({ ideaId: idea.id });
  };

  updateView = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const { ideaId } = req.query;

    const idea = await this._ideaService.findById(user.sub, ideaId as string);

    return pageWithData(
      req,
      res,
      pageNames.updateIdea,
      user,
      { idea },
      '/ideas',
    );
  };

  updateOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const updates = req.body as Idea;
    await this._ideaService.update(user.sub, updates);

    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  };

  deleteOperation = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const { ideaId } = req.query;

    await this._ideaService.delete(user.sub, ideaId as string);

    return res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  };
}
