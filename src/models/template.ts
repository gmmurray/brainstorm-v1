import { Schema, model } from 'mongoose';

export interface ITemplate {
  ownerId: string;
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
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  fields: { type: [templateFieldSchema], required: true },
});

export const TemplateModel = model<ITemplate>('Template', templateSchema);
