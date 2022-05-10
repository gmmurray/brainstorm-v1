import { initViewIdeasPage } from './viewIdeas';
import { mockIdea } from '../../mock/mockIdeas';
import { mockUser } from '../../mock/users';

const mockPageData = {
  user: mockUser,
  ideas: [mockIdea],
};

describe('view ideas page scripts', () => {
  it('returns empty object if nothing provided', () => {
    expect(initViewIdeasPage()).toStrictEqual({});
  });
  it('returns valid page data', () => {
    const pageStore = initViewIdeasPage(mockPageData);
    expect(pageStore.user).toStrictEqual(pageStore.user);
    expect(pageStore.ideas).toStrictEqual(pageStore.ideas);
    expect(pageStore.visibleIdeas).toStrictEqual(pageStore.ideas);
  });

  it('handles search success', () => {
    const pageStore = initViewIdeasPage(mockPageData);

    expect(pageStore.handleSearch).toBeTruthy();

    pageStore.searchTerm = mockIdea.name.slice(0, 1);

    pageStore.handleSearch?.();

    expect(pageStore.visibleIdeas).toStrictEqual(mockPageData.ideas);

    pageStore.searchTerm = '';
    pageStore.handleSearch?.();
    expect(pageStore.visibleIdeas).toStrictEqual(mockPageData.ideas);
  });

  it('handles search failure', () => {
    const pageStore = initViewIdeasPage(mockPageData);

    expect(pageStore.handleSearch).toBeTruthy();

    pageStore.searchTerm = 'z';

    pageStore.handleSearch?.();

    expect(pageStore.visibleIdeas).toStrictEqual([]);
  });

  it('handles search reset', () => {
    const pageStore = initViewIdeasPage(mockPageData);

    expect(pageStore.handleReset).toBeTruthy();

    pageStore.searchTerm = '123';

    pageStore.handleReset?.();

    expect(pageStore.visibleIdeas).toStrictEqual(pageStore.ideas);
    expect(pageStore.searchTerm).toBe('');
  });
});
