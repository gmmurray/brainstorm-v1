import { Template, TemplateModel } from '../models/template';
import {
  clearInMemoryDatabase,
  quitInMemoryDatabase,
} from '../loaders/inMemoryLoader';

import { HOME_PAGE_IDEA_COUNT } from '../constants/homePageItems';
import { IIdeaService } from '../types/services/IIdeaService';
import { IdeaModel } from '../models/idea';
import { IdeaService } from './ideaService';
import { ReasonPhrases } from 'http-status-codes';
import { mockIdea } from '../mock/mockIdeas';
import { mockTemplate1 } from '../mock/templates';
import { mockUser } from '../mock/users';
import mongooseLoader from '../loaders/mongooseLoader';

let ideaService: IIdeaService;

beforeAll(async () => {
  await mongooseLoader();
  ideaService = new IdeaService(IdeaModel);
});

afterEach(async () => await clearInMemoryDatabase());

afterAll(async () => await quitInMemoryDatabase());

describe('idea service', () => {
  it('finds by id success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const idea = await IdeaModel.create({
      ...mockIdea,
      template: template.id,
    });

    const result = await ideaService.findById(mockUser.sub, idea.id);
    expect(result?.id).toBe(idea.id);
    expect((result?.template as Template)?.id).toBe(template.id);
  });
  it('finds by id failure', async () => {
    await expect(async () =>
      ideaService.findById(mockIdea.userId, mockIdea.id),
    ).rejects.toThrowError(ReasonPhrases.NOT_FOUND);
  });

  it('finds by user id success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const ideas = await IdeaModel.insertMany([
      { ...mockIdea, template: template.id },
    ]);

    const result = await ideaService.findByUserId(mockIdea.userId);

    expect(result.length).toBe(ideas.length);
    expect(result.every(item => item.userId === mockIdea.userId)).toBeTruthy();
    expect(
      result.every(item => (item.template as Template)?.id === template.id),
    ).toBeTruthy();
  });
  it('finds by user id failure', async () => {
    await IdeaModel.insertMany([
      {
        ...mockIdea,
        userId: '1234',
        template: (mockIdea.template as Template)?.id,
      },
    ]);

    const result = await ideaService.findByUserId(mockIdea.userId);
    expect(result.length).toBe(0);
  });

  it('finds by template id success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const ideas = await IdeaModel.insertMany([
      { ...mockIdea, template: template.id },
    ]);

    const result = await ideaService.findByTemplateId(
      mockIdea.userId,
      template.id,
    );

    expect(result.length).toBe(ideas.length);
    expect(
      result.every(item => (item.template as Template)?.id === template.id),
    ).toBeTruthy();
  });
  it('finds by template id failure', async () => {
    await IdeaModel.insertMany([
      { ...mockIdea, template: '6277462d43b9f6fddd3eadf2' },
    ]);

    const result = await ideaService.findByTemplateId(
      mockIdea.userId,
      mockTemplate1.id,
    );
    expect(result.length).toBe(0);
  });

  it('finds recent success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const ideas = await IdeaModel.insertMany([
      { ...mockIdea, template: template.id },
    ]);

    const result = await ideaService.findRecent(mockIdea.userId);

    expect(result.length).toBe(ideas.length);
    expect(result.length).toBeLessThanOrEqual(HOME_PAGE_IDEA_COUNT);
  });

  it('creates success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const idea = await ideaService.create(mockIdea.userId, {
      ...mockIdea,
      template: template.id,
    });

    expect(idea).toBeTruthy();
    expect((idea.template as Template)?.id).toBe(template.id);
    expect(idea.fields.map(f => f.name)).toStrictEqual(
      mockTemplate1.fields.map(f => f.name),
    );
  });
  it('creates failure', async () => {
    await expect(
      async () =>
        await ideaService.create(mockIdea.userId, {
          template: {
            userId: mockIdea.userId,
            id: '1234',
            name: '',
            fields: [],
          },
        }),
    ).rejects.toThrow();
  });

  it('updates success', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const idea = await ideaService.create(mockIdea.userId, {
      ...mockIdea,
      template: template.id,
    });

    const newValue = 'test';
    idea.fields[0].value = newValue;
    await ideaService.update(idea.userId, idea);

    const updatedIdea = await ideaService.findById(idea.userId, idea.id);

    expect(updatedIdea).toBeTruthy();
    expect(updatedIdea?.fields[0].value).toBe(newValue);
  });
  it('updates failure', async () => {
    await expect(
      async () => await ideaService.update(mockIdea.userId, mockIdea),
    ).rejects.toThrow();
  });

  it('deletes', async () => {
    const template = await TemplateModel.create(mockTemplate1);
    const idea = await ideaService.create(mockIdea.userId, {
      ...mockIdea,
      template: template.id,
    });

    await expect(ideaService.delete(idea.userId, idea.id)).resolves.toBe(
      undefined,
    );
  });
});
