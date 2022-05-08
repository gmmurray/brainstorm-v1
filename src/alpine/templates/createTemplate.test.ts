/**
 * @jest-environment jsdom
 */

import {
  createTemplatePageStoreDefault,
  initCreateTemplatePage,
} from './createTemplate';

import { TemplateFieldTypes } from '../../types/templateFields';
import axios from 'axios';
import { mockTemplate1 } from '../../mock/templates';
import { mockUser } from '../../mock/users';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('create template page scripts', () => {
  test('returns empty object if nothing provided', () => {
    expect(initCreateTemplatePage()).toStrictEqual({});
  });
  test('initializes properties', () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    const { name, fields, user, loading, message, newField, fieldTypeOptions } =
      pageStore;

    expect(name).toBe(createTemplatePageStoreDefault.name);
    expect(fields).toStrictEqual(createTemplatePageStoreDefault.fields);
    expect(user).toBe(mockUser);
    expect(loading).toBe(createTemplatePageStoreDefault.loading);
    expect(message).toBe(createTemplatePageStoreDefault.message);
    expect(newField).toStrictEqual(createTemplatePageStoreDefault.newField);
    expect(fieldTypeOptions).toStrictEqual(
      createTemplatePageStoreDefault.fieldTypeOptions,
    );
  });
  test('handle create method success', async () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });

    pageStore.name = mockTemplate1.name;
    pageStore.fields = mockTemplate1.fields;

    expect(pageStore.handleCreate).toBeTruthy();

    const templateId = '123';
    mockedAxios.post.mockResolvedValueOnce({ data: { templateId } });

    delete (window as any).location;
    (window.location as any) = { replace: jest.fn() };

    await pageStore.handleCreate?.();
    expect(pageStore.loading).toBe(false);
    expect(mockedAxios.post).toBeCalledWith('/templates/create', {
      name: mockTemplate1.name,
      fields: mockTemplate1.fields,
      userId: mockUser.sub,
    });
    expect(window.location.replace).toBeCalledWith(
      `/templates/view?templateId=${templateId}`,
    );
  });
  test('handle create method failure', async () => {
    const message = 'error';

    const pageStore = initCreateTemplatePage({ user: mockUser });

    pageStore.name = mockTemplate1.name;
    pageStore.fields = mockTemplate1.fields;
    expect(pageStore.handleCreate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleCreate?.();
    expect(pageStore.loading).toBe(false);
    expect(mockedAxios.post).toBeCalledWith('/templates/create', {
      name: mockTemplate1.name,
      fields: mockTemplate1.fields,
      userId: mockUser.sub,
    });
    expect(pageStore.message).toBe(message);

    mockedAxios.post.mockResolvedValueOnce(undefined);
    await pageStore.handleCreate?.();
    expect(pageStore.message).toBe('Error creating template');
  });
  test('handle invalid form submission', async () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    expect(pageStore.handleCreate).toBeTruthy();
    pageStore.name = '';

    await pageStore.handleCreate?.();
    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      createTemplatePageStoreDefault.validationMessage,
    );

    pageStore.name = undefined;

    await pageStore.handleCreate?.();
    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      createTemplatePageStoreDefault.validationMessage,
    );
  });
  test('handle field add success', () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    const newField = {
      name: 'test',
      type: TemplateFieldTypes.STRING,
    };
    pageStore.newField = newField;
    pageStore.handleAddField?.();
    expect(pageStore.fields).toContainEqual(newField);
    expect(pageStore.newField).toStrictEqual(
      createTemplatePageStoreDefault.newField,
    );

    // create an array if fields is undefined
    pageStore.newField = newField;
    pageStore.fields = undefined;
    pageStore.handleAddField?.();
    expect(pageStore.fields).toStrictEqual([newField]);
    expect(pageStore.newField).toStrictEqual(
      createTemplatePageStoreDefault.newField,
    );
  });
  test('handle field add failure', () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    const newField = {
      name: '',
      type: TemplateFieldTypes.NUMBER,
    };
    pageStore.newField = newField;
    pageStore.handleAddField?.();
    expect(pageStore.fields).not.toContainEqual(newField);
    expect(pageStore.newField).toStrictEqual(newField);
  });
  test('handle remove field success', () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    const indexToRemove = 0;
    const fieldToRemove = { name: 'test', type: TemplateFieldTypes.STRING };
    pageStore.fields = [fieldToRemove];
    pageStore.handleRemoveField?.(indexToRemove);
    expect(pageStore.fields).not.toContainEqual(fieldToRemove);

    // create an array if fields is undefined
    pageStore.fields = undefined;
    pageStore.handleRemoveField?.(indexToRemove);
    expect(pageStore.fields).toStrictEqual([]);
  });
  test('handle remove field failure', () => {
    const pageStore = initCreateTemplatePage({ user: mockUser });
    const indexToRemove = -1;
    const fieldToRemove = { name: 'test', type: TemplateFieldTypes.STRING };
    pageStore.fields = [fieldToRemove];
    pageStore.handleRemoveField?.(indexToRemove);
    expect(pageStore.fields).toContainEqual(fieldToRemove);
  });
});
