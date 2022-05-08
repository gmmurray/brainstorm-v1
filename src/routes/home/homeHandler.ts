import { Request, Response } from 'express';

import { AuthUser } from '../../types/user';
import { IIdeaService } from '../../types/services/IIdeaService';
import { ITemplateService } from '../../types/services/ITemplateService';
import { pageNames } from '../../constants/pageNames';
import { pageWithData } from '../shared/pageWithData';

export class HomeHandler {
  private _templateService: ITemplateService;
  private _ideaService: IIdeaService;

  constructor(templateService: ITemplateService, ideaService: IIdeaService) {
    this._templateService = templateService;
    this._ideaService = ideaService;
  }

  view = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const requests = [
      await this._templateService.findRecent(user.sub),
      await this._ideaService.findRecent(user.sub),
    ];

    await Promise.all(requests);

    return pageWithData(req, res, pageNames.home, user, {
      templates: requests[0],
      ideas: requests[1],
    });
  };
}
