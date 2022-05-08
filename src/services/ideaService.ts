import { IIdea, IIdeaMongo, Idea, IdeaModel } from '../models/idea';
import { ITemplateMongo, Template } from '../models/template';

import { HOME_PAGE_IDEA_COUNT } from '../constants/homePageItems';
import { IIdeaService } from '../types/services/IIdeaService';
import { ReasonPhrases } from 'http-status-codes';

export class IdeaService implements IIdeaService {
  private _ideaModel: typeof IdeaModel;

  constructor(ideaModel: typeof IdeaModel) {
    this._ideaModel = ideaModel;
  }

  public findById: IIdeaService['findById'] = async (userId, ideaId) => {
    const idea = await this._ideaModel
      .findOne({
        $and: [{ _id: ideaId }, { userId }],
      })
      .populate('template');

    if (!idea) throw new Error(ReasonPhrases.NOT_FOUND);

    return new Idea(idea);
  };

  public findByUserId: IIdeaService['findByUserId'] = async userId => {
    const ideas = await this._ideaModel
      .find({ userId })
      .populate('template')
      .lean<IIdeaMongo[]>();

    return ideas.map(i => ({
      ...new Idea(i),
      template: new Template(i.template as ITemplateMongo),
    }));
  };

  public findByTemplateId: IIdeaService['findByTemplateId'] = async (
    userId,
    templateId,
  ) => {
    const ideas = await this._ideaModel
      .find({
        $and: [{ userId }, { template: templateId }],
      })
      .populate('template')
      .lean<IIdeaMongo[]>();

    return ideas.map(i => ({
      ...new Idea(i),
      template: new Template(i.template as ITemplateMongo),
    }));
  };

  public findRecent: IIdeaService['findRecent'] = async userId => {
    const ideas = await this._ideaModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(HOME_PAGE_IDEA_COUNT)
      .lean<IIdeaMongo[]>();

    return ideas.map(i => ({
      ...new Idea(i),
      template: new Template(i.template as ITemplateMongo),
    }));
  };

  public create: IIdeaService['create'] = async (
    userId: string,
    idea: Partial<IIdea>,
  ) => {
    const newIdea = await this._ideaModel.create({
      ...idea,
      userId,
    });

    return (await this.findById(userId, newIdea.id)) as Idea;
  };

  public update: IIdeaService['update'] = async (userId, idea) => {
    await this._ideaModel.findOneAndReplace(
      { $and: [{ _id: idea.id }, { userId }] },
      idea,
    );
  };

  public delete: IIdeaService['delete'] = async (userId, ideaId) => {
    await this._ideaModel.findOneAndDelete({
      $and: [{ _id: ideaId }, { userId }],
    });
  };
}
