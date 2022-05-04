import { ITemplate, TemplateModel } from 'models/template';

import { ITemplateService } from 'types/services/ITemplateService';
import { Types } from 'mongoose';

export class TemplateService implements ITemplateService {
  private _templateModel: typeof TemplateModel;

  constructor(templateModel: typeof TemplateModel) {
    this._templateModel = templateModel;
  }

  public findByUserId: ITemplateService['findByUserId'] = async userId => {
    return await this._templateModel.find({ userId }).exec();
  };

  public create: ITemplateService['create'] = async (userId, template) => {
    return await this._templateModel.create({ ...template, userId });
  };

  public update: ITemplateService['update'] = async (id, template) => {
    await this._templateModel.findOneAndReplace({ _id: id }, template);
  };

  public delete: ITemplateService['delete'] = async (id: string) => {
    await this._templateModel.findOneAndDelete({ _id: id });
  };
}
