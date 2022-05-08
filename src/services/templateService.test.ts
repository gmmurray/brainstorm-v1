import {
  clearInMemoryDatabase,
  quitInMemoryDatabase,
} from '../loaders/inMemoryLoader';

import { HOME_PAGE_TEMPLATE_COUNT } from '../constants/homePageItems';
import { ITemplateService } from '../types/services/ITemplateService';
import { ReasonPhrases } from 'http-status-codes';
import { TemplateModel } from '../models/template';
import { TemplateService } from './templateService';
import { mockTemplate1 } from '../mock/templates';
import { mockUser } from '../mock/users';
import mongooseLoader from '../loaders/mongooseLoader';

let templateService: ITemplateService;

beforeAll(async () => {
  await mongooseLoader();
  templateService = new TemplateService(TemplateModel);
});

afterEach(async () => await clearInMemoryDatabase());

afterAll(async () => await quitInMemoryDatabase());

describe('template service', () => {
  it('finds by id success', async () => {
    const template = await TemplateModel.create(mockTemplate1);

    const result = await templateService.findById(mockUser.sub, template.id);
    expect(result?.id).toBe(template.id);
  });
  it('finds by id failure', async () => {
    await expect(async () =>
      templateService.findById(mockTemplate1.userId, mockTemplate1.id),
    ).rejects.toThrowError(ReasonPhrases.NOT_FOUND);
  });

  it('finds by user id success', async () => {
    const templates = await TemplateModel.insertMany([mockTemplate1]);

    const result = await templateService.findByUserId(mockTemplate1.userId);

    expect(result.length).toBe(templates.length);
    expect(
      result.every(item => item.userId === mockTemplate1.userId),
    ).toBeTruthy();
  });
  it('finds by user id failure', async () => {
    await TemplateModel.insertMany([{ ...mockTemplate1, userId: '1234' }]);

    const result = await templateService.findByUserId(mockTemplate1.userId);
    expect(result.length).toBe(0);
  });

  it('finds recent success', async () => {
    const templates = await TemplateModel.insertMany([mockTemplate1]);

    const result = await templateService.findRecent(mockTemplate1.userId);

    expect(result.length).toBe(templates.length);
    expect(result.length).toBeLessThanOrEqual(HOME_PAGE_TEMPLATE_COUNT);
  });

  it('creates success', async () => {
    const template = await templateService.create(
      mockTemplate1.userId,
      mockTemplate1,
    );

    expect(template).toBeTruthy();
    expect(template.name).toBe(mockTemplate1.name);
  });
  it('creates failure', async () => {
    await expect(
      async () => await templateService.create(mockTemplate1.userId, {}),
    ).rejects.toThrow();
  });

  it('updates success', async () => {
    const template = await templateService.create(
      mockTemplate1.userId,
      mockTemplate1,
    );

    const newName = 'new name';
    await templateService.update(template.userId, {
      ...template,
      name: newName,
    });

    const updatedTemplate = await templateService.findById(
      template.userId,
      template.id,
    );
    expect(updatedTemplate).toBeTruthy();
    expect(updatedTemplate?.name).toBe(newName);
  });
  it('updates failure', async () => {
    await expect(
      async () =>
        await templateService.update(mockTemplate1.userId, mockTemplate1),
    ).rejects.toThrowError(ReasonPhrases.BAD_REQUEST);
  });

  it('deletes', async () => {
    const template = await templateService.create(
      mockTemplate1.userId,
      mockTemplate1,
    );

    await expect(
      templateService.delete(template.userId, template.id),
    ).resolves.toBe(undefined);
  });
});
