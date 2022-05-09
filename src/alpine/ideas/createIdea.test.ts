/**
 * @jest-environment jsdom
 */

import { createIdeaPageStoreDefault, initCreateIdeaPage } from './createIdea';

import { IIdeaField } from '../../models/idea';
import { ITemplateField } from '../../types/templateFields';
import axios from 'axios';
import { mockTemplate1 } from '../../mock/templates';
import { mockUser } from '../../mock/users';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('create idea page scripts', () => {
  it('returns empty object if nothing provided', () => {
    expect(initCreateIdeaPage()).toStrictEqual({});
  });

  it('initializes properties', () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });
    const {
      user,
      templates,
      name,
      selectedTemplate,
      fields,
      loading,
      message,
    } = pageStore;

    expect(user).toBe(mockUser);
    expect(templates).toStrictEqual([mockTemplate1]);
    expect(selectedTemplate).toBe(createIdeaPageStoreDefault.selectedTemplate);
    expect(fields).toBe(createIdeaPageStoreDefault.fields);
    expect(loading).toBe(createIdeaPageStoreDefault.loading);
    expect(message).toBe(createIdeaPageStoreDefault.message);
    expect(name).toBe(createIdeaPageStoreDefault.name);
  });

  it('handles select template', () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    expect(pageStore.handleSelectTemplate).toBeTruthy();

    pageStore.handleSelectTemplate?.(0);

    expect(
      fieldsArePresent(mockTemplate1.fields, pageStore.fields as IIdeaField[]),
    ).toBeTruthy();
  });
  it('handles deselect template', () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    pageStore.handleSelectTemplate?.();

    expect(pageStore.fields).toStrictEqual([]);
  });
  it('handles select template failure', () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    pageStore.handleSelectTemplate?.(-1);

    expect(pageStore.selectedTemplate).toBe(undefined);
    expect(pageStore.fields).toStrictEqual([]);
  });

  it('handle create method success', async () => {
    const fields = mockTemplate1.fields.map(f => ({
      name: f.name,
      type: f.type,
      value: undefined,
    }));
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    expect(pageStore.handleCreate).toBeTruthy();

    const ideaId = '123';
    mockedAxios.post.mockResolvedValueOnce({ data: { ideaId } });

    delete (window as any).location;
    (window.location as any) = { replace: jest.fn() };

    pageStore.selectedTemplate = 0;
    pageStore.fields = fields;
    pageStore.name = 'test';

    await pageStore.handleCreate?.();

    expect(pageStore.loading).toBeTruthy();
    expect(mockedAxios.post).toBeCalledWith('/ideas/create', {
      userId: mockUser.sub,
      template: mockTemplate1.id,
      name: 'test',
      fields,
    });
    expect(window.location.replace).toBeCalledWith(
      `/ideas/view?ideaId=${ideaId}`,
    );
  });
  it('handle create method failure', async () => {
    const message = 'error';
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    pageStore.selectedTemplate = 0;
    pageStore.name = 'test';

    expect(pageStore.handleCreate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleCreate?.();

    expect(pageStore.loading).toBeFalsy();
    expect(pageStore.message).toBe(message);

    mockedAxios.post.mockResolvedValueOnce(undefined);
    await pageStore.handleCreate?.();

    expect(pageStore.message).toBe('Error creating idea');
  });
  it('handle invalid form submission', async () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });

    expect(pageStore.handleCreate).toBeTruthy();

    pageStore.selectedTemplate = -1;

    await pageStore.handleCreate?.();
    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      createIdeaPageStoreDefault.validationMessage,
    );

    pageStore.selectedTemplate = undefined;

    await pageStore.handleCreate?.();
    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      createIdeaPageStoreDefault.validationMessage,
    );
  });
});

const fieldsArePresent = (
  templateFields: ITemplateField[],
  ideaFields: IIdeaField[],
) => {
  const map: Record<string, any> = {};
  templateFields.forEach(f => {
    map[f.name] = null;
  });
  ideaFields.forEach(f => (map[f.name] = true));

  return Object.keys(map).every(key => map[key]);
};
