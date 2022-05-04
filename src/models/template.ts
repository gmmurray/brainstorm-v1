import { Document, Schema, model } from 'mongoose';

export interface ITemplate {
  userId: string;
  name: string;
  fields: ITemplateField[];
}

export interface ITemplateField {
  name: string;
  type: 'string' | 'boolean' | 'number';
}

const templateFieldSchema = new Schema<ITemplateField>({
  name: String,
  type: String,
});

const templateSchema = new Schema<ITemplate>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  fields: { type: [templateFieldSchema], required: true },
});

export const TemplateModel = model<ITemplate>('Template', templateSchema);
export interface ITemplateDocument extends Document, ITemplate {}
