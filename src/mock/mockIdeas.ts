import { IIdeaService } from '../types/services/IIdeaService';
import { Idea } from '../models/idea';
import { mockTemplate1 } from './templates';
import { mockUser } from './users';

export const mockIdea: Idea = {
  id: '62773783a517247ec3dea7fd',
  name: 'test idea',
  template: mockTemplate1,
  userId: mockUser.sub,
  fields: mockTemplate1.fields.map(f => ({
    name: f.name,
    type: f.type,
    value: '123',
  })),
};

export class MockIdeaService implements IIdeaService {
  public findById: IIdeaService['findById'] = (userId, ideaId) =>
    Promise.resolve({ ...mockIdea, userId, id: ideaId });
  public findByUserId: IIdeaService['findByUserId'] = userId =>
    Promise.resolve([{ ...mockIdea, userId }]);
  public findByTemplateId: IIdeaService['findByTemplateId'] = (
    userId,
    templateId,
  ) =>
    Promise.resolve([
      { ...mockIdea, userId, template: { ...mockTemplate1, id: templateId } },
    ]);
  public findRecent: IIdeaService['findRecent'] = userId =>
    Promise.resolve([{ ...mockIdea, userId }]);
  public create: IIdeaService['create'] = (
    userId: string,
    idea: Partial<Idea>,
  ) => Promise.resolve({ ...idea, userId } as Idea);
  public update: IIdeaService['update'] = () => Promise.resolve();
  public delete: IIdeaService['delete'] = () => Promise.resolve();
}
