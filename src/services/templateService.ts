import { ITemplateMongo, Template, TemplateModel } from '../models/template';

import { ITemplateService } from '../types/services/ITemplateService';

export class TemplateService implements ITemplateService {
  private _templateModel: typeof TemplateModel;

  constructor(templateModel: typeof TemplateModel) {
    this._templateModel = templateModel;
  }

  public findById: ITemplateService['findById'] = async (
    userId: string,
    templateId: string,
  ) => {
    const template = await this._templateModel
      .findOne({ $and: [{ _id: templateId }, { userId }] })
      .lean<ITemplateMongo>();

    return new Template(template);
  };

  public findByUserId: ITemplateService['findByUserId'] = async userId => {
    const templates = await this._templateModel
      .find({ userId })
      .lean<ITemplateMongo[]>();

    return templates.map(t => new Template(t));
  };

  public create: ITemplateService['create'] = async (userId, template) => {
    const newTemplate = await this._templateModel.create({
      ...template,
      userId,
    });
    return new Template(newTemplate);
  };

  public update: ITemplateService['update'] = async (userId, template) => {
    await this._templateModel.findOneAndReplace(
      { $and: [{ _id: template.id }, { userId }] },
      template,
    );
  };

  public delete: ITemplateService['delete'] = async (
    userId: string,
    templateId,
  ) => {
    await this._templateModel.findOneAndDelete({
      $and: [{ _id: templateId }, { userId }],
    });
  };
}
