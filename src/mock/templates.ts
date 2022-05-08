import { ITemplateService } from '../types/services/ITemplateService';
import { Template } from '../models/template';
import { TemplateFieldTypes } from '../types/templateFields';
import { mockUser } from './users';

export const mockTemplate1: Template = {
  id: '62769163aa16b569708d6b38',
  userId: mockUser.sub,
  name: 'test template',
  fields: [
    {
      name: 'field1',
      type: TemplateFieldTypes.STRING,
    },
  ],
};

export class MockTemplateService implements ITemplateService {
  public findById: ITemplateService['findById'] = async (
    userId: string,
    templateId: string,
  ) => Promise.resolve({ ...mockTemplate1, userId, id: templateId });

  public findByUserId: ITemplateService['findByUserId'] = async userId =>
    Promise.resolve([{ ...mockTemplate1, userId }]);

  public findRecent: ITemplateService['findRecent'] = async userId =>
    Promise.resolve([{ ...mockTemplate1, userId }]);

  public create: ITemplateService['create'] = async (userId, template) =>
    Promise.resolve({ ...template, userId } as Template);

  public update: ITemplateService['update'] = async () => Promise.resolve();

  public delete: ITemplateService['delete'] = async () => Promise.resolve();
}
