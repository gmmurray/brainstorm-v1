import { Request, Response } from 'express';

import { AuthUser } from '../../types/user';
import { ITemplateService } from 'types/services/ITemplateService';
import { TemplateService } from '../../services/templateService';

export class TemplateHandlers {
  private _templateService: ITemplateService;

  constructor(templateService: ITemplateService) {
    this._templateService = templateService;
  }

  findByUserId = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    return res
      .status(200)
      .json(await this._templateService.findByUserId(user.sub));
  };

  getCreatePage = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    return res.render('createTemplate', {
      ['page_data']: JSON.stringify({
        user,
      }),
    });
  };

  create = async (req: Request, res: Response) => {
    const user = AuthUser.getUserFromRequest(req);

    const template = await this._templateService.create(
      user.sub,
      req.body.template,
    );

    return res.render('updateTemplate', {
      ['page_data']: JSON.stringify({ template }),
    });
  };
}
