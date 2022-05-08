import { ITemplate, Template } from './template';
import { Schema, Types, model } from 'mongoose';

import { ITemplateField } from '../types/templateFields';

export interface IIdeaField extends ITemplateField {
  value: any;
}

export interface IIdea {
  userId: string;
  template?: string | ITemplate;
  fields: IIdeaField[];
}

const ideaFieldSchema = new Schema<IIdeaField>({
  type: String,
  name: String,
  value: Schema.Types.Mixed,
});

const ideaSchema = new Schema<IIdea>({
  userId: { type: String, required: true },
  template: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
  },
  fields: { type: [ideaFieldSchema] },
});

export const IdeaModel = model<IIdea>('Idea', ideaSchema);

export interface IIdeaMongo extends IIdea {
  _id: Types.ObjectId;
}

export class Idea implements IIdea {
  id: string;
  userId: string;
  fields: IIdeaField[];
  template?: Template | string;
  constructor(idea: IIdeaMongo) {
    this.id = idea._id.toString();
    this.userId = idea.userId;
    this.fields = idea.fields;
    this.template = idea.template as Template;
  }
}
