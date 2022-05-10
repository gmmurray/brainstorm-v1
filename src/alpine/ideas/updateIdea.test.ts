/**
 * @jest-environment jsdom
 */

import { initUpdateIdeaPage, updateIdeaPageStoreDefault } from './updateIdea';

import { Idea } from '../../models/idea';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { mockIdea } from '../../mock/mockIdeas';
import { mockUser } from '../../mock/users';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('update idea page scripts', () => {
  it('returns empty object if nothing provided', () => {
    expect(initUpdateIdeaPage()).toStrictEqual({});
  });

  it('initializes properties', () => {
    const pageStore = initUpdateIdeaPage({
      user: mockUser,
      idea: mockIdea,
    });

    const { user, idea, loading, message } = pageStore;

    expect(user).toStrictEqual(mockUser);
    expect(idea).toStrictEqual(mockIdea);
    expect(loading).toBe(updateIdeaPageStoreDefault.loading);
    expect(message).toBe(updateIdeaPageStoreDefault.message);
  });

  it('handle update method success', async () => {
    const pageStore = initUpdateIdeaPage({ user: mockUser, idea: mockIdea });

    expect(pageStore.handleUpdate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ status: StatusCodes.OK });

    delete (window as any).location;
    (window.location as any) = { reload: jest.fn() };

    await pageStore.handleUpdate?.();

    expect(pageStore.loading).toBe(true);
    expect(mockedAxios.post).toBeCalledWith('/ideas/update', {
      ...mockIdea,
    });
    expect(window.location.reload).toBeCalledTimes(1);
  });
  it('handle update method failure', async () => {
    const message = 'error';

    const pageStore = initUpdateIdeaPage({
      user: mockUser,
      idea: mockIdea,
    });

    expect(pageStore.handleUpdate).toBeTruthy();

    mockedAxios.post.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleUpdate?.();
    expect(pageStore.loading).toBe(false);
    expect(mockedAxios.post).toBeCalledWith('/ideas/update', { ...mockIdea });
    expect(pageStore.message).toBe(message);

    mockedAxios.post.mockResolvedValueOnce(undefined);
    await pageStore.handleUpdate?.();
    expect(pageStore.message).toBe(updateIdeaPageStoreDefault.updateError);
  });
  it('handles invalid form submission', async () => {
    const pageStore = initUpdateIdeaPage({
      user: mockUser,
      idea: mockIdea,
    });

    expect(pageStore.handleUpdate).toBeTruthy();
    (pageStore.idea as Idea).name = '';

    await pageStore.handleUpdate?.();

    expect(mockedAxios.post).not.toBeCalled();
    expect(pageStore.message).toBe(
      updateIdeaPageStoreDefault.validationMessage,
    );
  });
  it('handle delete method success', async () => {
    const pageStore = initUpdateIdeaPage({
      user: mockUser,
      idea: mockIdea,
    });

    expect(pageStore.handleDelete).toBeTruthy();

    mockedAxios.delete.mockResolvedValueOnce({
      status: StatusCodes.NO_CONTENT,
    });

    delete (window as any).location;
    (window.location as any) = { replace: jest.fn() };

    await pageStore.handleDelete?.();

    expect(pageStore.loading).toBe(true);
    expect(mockedAxios.delete).toBeCalledWith(
      `/ideas?ideaId=${pageStore.idea?.id}`,
    );
    expect(window.location.replace).toBeCalledTimes(1);
    expect(window.location.replace).toBeCalledWith('/ideas');
  });
  it('handle delete method failure', async () => {
    const message = 'error';

    const pageStore = initUpdateIdeaPage({
      user: mockUser,
      idea: mockIdea,
    });

    expect(pageStore.handleDelete).toBeTruthy();

    mockedAxios.delete.mockResolvedValueOnce({ data: { message } });

    await pageStore.handleDelete?.();

    expect(pageStore.loading).toBe(false);
    expect(mockedAxios.delete).toBeCalledWith(
      `/ideas?ideaId=${pageStore.idea?.id}`,
    );
    expect(pageStore.message).toBe(message);

    mockedAxios.delete.mockResolvedValueOnce(undefined);

    await pageStore.handleDelete?.();

    expect(pageStore.message).toBe(updateIdeaPageStoreDefault.deleteError);
  });
});
