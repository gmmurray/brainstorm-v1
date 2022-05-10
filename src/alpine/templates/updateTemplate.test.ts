/**
 * @jest-environment jsdom
 */

import {
  initUpdateTemplatePage,
  updateTemplatePageStoreDefault,
} from './updateTemplate';

import { StatusCodes } from 'http-status-codes';
import { Template } from '../../models/template';
import { TemplateFieldTypes } from '../../types/templateFields';
import axios from 'axios';
import { mockLocationProperty } from '../../mock/location';
import { mockTemplate1 } from '../../mock/templates';
import { mockUser } from '../../mock/users';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('update template page scripts', () => {
  test('returns empty object if nothing provided', () => {
    expect(initUpdateTemplatePage()).toStrictEqual({});
  });

  test('initializes properties', () => {
    const pageStore = createPageStore();

    const { user, template, loading, message, newField, fieldTypeOptions } =
      pageStore;

    expect(user).toBe(mockUser);
    expect(template).toBe(mockTemplate1);
    expect(loading).toBe(updateTemplatePageStoreDefault.loading);
    expect(message).toBe(updateTemplatePageStoreDefault.message);
    expect(newField).toStrictEqual(updateTemplatePageStoreDefault.newField);
    expect(fieldTypeOptions).toStrictEqual(
      updateTemplatePageStoreDefault.fieldTypeOptions,
    );
  });

  test('handle update method success', async () => {
    const pageStore = createPageStore();
    expect(pageStore.handleUpdate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ status: StatusCodes.OK });

    mockLocationProperty('reload');

    await pageStore.handleUpdate?.();

    expect(pageStore.loading).toBe(true);
    expect(mockedAxios.post).toBeCalledWith('/templates/update', {
      ...mockTemplate1,
    });
    expect(window.location.reload).toBeCalledTimes(1);
  });

  test('handle update method failure', async () => {
    const message = 'error';

    const pageStore = createPageStore();

    expect(pageStore.handleUpdate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleUpdate?.();
    expect(pageStore.loading).toBe(false);
    expect(mockedAxios.post).toBeCalledWith('/templates/update', {
      ...mockTemplate1,
    });
    expect(pageStore.message).toBe(message);

    mockedAxios.post.mockResolvedValueOnce(undefined);
    await pageStore.handleUpdate?.();
    expect(pageStore.message).toBe(updateTemplatePageStoreDefault.updateError);
  });

  test('handle invalid form submission', async () => {
    const pageStore = createPageStore();
    expect(pageStore.handleUpdate).toBeTruthy();
    (pageStore.template as Template).name = '';

    await pageStore.handleUpdate?.();
    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      updateTemplatePageStoreDefault.validationMessage,
    );
  });

  test('handle delete method success', async () => {
    const pageStore = createPageStore();
    expect(pageStore.handleDelete).toBeTruthy();

    mockedAxios.delete.mockResolvedValueOnce({
      status: StatusCodes.NO_CONTENT,
    });

    mockLocationProperty('replace');

    await pageStore.handleDelete?.();

    expect(pageStore.loading).toBe(true);
    expect(mockedAxios.delete).toBeCalledWith(
      `/templates?templateId=${pageStore.template?.id}`,
    );
    expect(window.location.replace).toBeCalledTimes(1);
    expect(window.location.replace).toBeCalledWith('/templates');
  });

  test('handle delete method failure', async () => {
    const message = 'error';

    const pageStore = createPageStore();
    expect(pageStore.handleDelete).toBeTruthy();

    mockedAxios.delete.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleDelete?.();
    expect(pageStore.loading).toBeFalsy();
    expect(mockedAxios.delete).toBeCalledWith(
      `/templates?templateId=${pageStore.template?.id}`,
    );
    expect(pageStore.message).toBe(message);

    mockedAxios.delete.mockResolvedValueOnce(undefined);
    await pageStore.handleDelete?.();
    expect(pageStore.message).toBe(updateTemplatePageStoreDefault.deleteError);
  });

  test('handle field add success', () => {
    const pageStore = createPageStore();
    const newField = {
      name: 'test',
      type: TemplateFieldTypes.STRING,
    };
    pageStore.newField = newField;
    pageStore.handleAddField?.();
    expect(pageStore.template?.fields).toContainEqual(newField);
    expect(pageStore.newField).toStrictEqual(
      updateTemplatePageStoreDefault.newField,
    );
  });
  test('handle field add failure', () => {
    const pageStore = createPageStore();
    const newField = {
      name: '',
      type: TemplateFieldTypes.NUMBER,
    };
    pageStore.newField = newField;
    pageStore.handleAddField?.();
    expect(pageStore.template?.fields).not.toContainEqual(newField);
    expect(pageStore.newField).toStrictEqual(newField);
  });
  test('handle remove field success', () => {
    const pageStore = createPageStore();
    const indexToRemove = 0;
    const fieldToRemove = { name: 'test', type: TemplateFieldTypes.STRING };
    (pageStore.template as Template).fields = [fieldToRemove];
    pageStore.handleRemoveField?.(indexToRemove);
    expect(pageStore.template?.fields).not.toContainEqual(fieldToRemove);
  });
  test('handle remove field failure', () => {
    const pageStore = initUpdateTemplatePage({
      user: mockUser,
      template: mockTemplate1 as Template,
    });
    const indexToRemove = -1;
    const fieldToRemove = { name: 'test', type: TemplateFieldTypes.STRING };
    (pageStore.template as Template).fields = [fieldToRemove];
    pageStore.handleRemoveField?.(indexToRemove);
    expect(pageStore.template?.fields).toContainEqual(fieldToRemove);
  });
});

const createPageStore = () =>
  initUpdateTemplatePage({
    user: mockUser,
    template: mockTemplate1,
  });
