import { Template } from '../../models/template';

export interface ITemplateService {
  findById: (userId: string, templateId: string) => Promise<Template | null>;
  findByUserId: (userId: string) => Promise<Template[]>;
  create: (userId: string, template: Partial<Template>) => Promise<Template>;
  update: (userId: string, template: Template) => Promise<void>;
  delete: (userId: string, templateId: string) => Promise<void>;
}
