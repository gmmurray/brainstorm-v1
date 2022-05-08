import { Schema, Types, model } from 'mongoose';

import { ITemplateField } from '../types/templateFields';

export interface ITemplate {
  userId: string;
  name: string;
  fields: ITemplateField[];
}

const templateFieldSchema = new Schema<ITemplateField>({
  name: String,
  type: String,
});

const templateSchema = new Schema<ITemplate>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true, minlength: 1 },
    fields: { type: [templateFieldSchema], required: true },
  },
  { timestamps: true },
);

export const TemplateModel = model<ITemplate>('Template', templateSchema);
export interface ITemplateMongo extends ITemplate {
  _id: Types.ObjectId;
}

export class Template implements ITemplate {
  id: string;
  userId: string;
  name: string;
  fields: ITemplateField[];
  constructor(template: ITemplateMongo) {
    this.id = template._id.toString();
    this.userId = template.userId;
    this.name = template.name;
    this.fields = template.fields;
  }
}
