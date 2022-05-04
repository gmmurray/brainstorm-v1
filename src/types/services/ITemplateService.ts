import { ITemplate, ITemplateDocument } from 'models/template';

import { Types } from 'mongoose';

export interface ITemplateService {
  findByUserId: (userId: string) => Promise<ITemplateDocument[]>;
  create: (
    userId: string,
    template: Partial<ITemplate>,
  ) => Promise<ITemplateDocument>;
  update: (id: string, template: ITemplate) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
