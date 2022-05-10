import { initViewTemplatesPage } from './viewTemplates';
import { mockTemplate1 } from '../../mock/templates';
import { mockUser } from '../../mock/users';

const mockPageData = {
  user: mockUser,
  templates: [mockTemplate1],
};

describe('view templates page scripts', () => {
  test('returns empty object if nothing provided', () => {
    expect(initViewTemplatesPage()).toStrictEqual({});
  });
  test('returns valid page data', () => {
    const result = initViewTemplatesPage(mockPageData);
    expect(result).toBeTruthy();
  });
  test('returns valid user data', () => {
    const result = initViewTemplatesPage(mockPageData);
    expect(result.user).toBeTruthy();
    expect(result.user).toBe(mockUser);
  });
  test('returns valid templates data', () => {
    const result = initViewTemplatesPage(mockPageData);
    expect(result.templates).toBeTruthy();
    expect(
      result.templates?.every(t => t.userId === mockUser.sub),
    ).toBeTruthy();
  });

  test('handles search success', () => {
    const pageStore = initViewTemplatesPage(mockPageData);

    expect(pageStore.handleSearch).toBeTruthy();

    pageStore.searchTerm = mockTemplate1.name.slice(0, 1);

    pageStore.handleSearch?.();

    expect(pageStore.visibleTemplates).toStrictEqual(mockPageData.templates);

    pageStore.searchTerm = '';
    pageStore.handleSearch?.();
    expect(pageStore.visibleTemplates).toStrictEqual(mockPageData.templates);
  });

  test('handles search failure', () => {
    const pageStore = initViewTemplatesPage(mockPageData);

    expect(pageStore.handleSearch).toBeTruthy();

    pageStore.searchTerm = 'z';

    pageStore.handleSearch?.();

    expect(pageStore.visibleTemplates).toStrictEqual([]);
  });

  test('handles search reset', () => {
    const pageStore = initViewTemplatesPage(mockPageData);

    expect(pageStore.handleReset).toBeTruthy();

    pageStore.searchTerm = '123';

    pageStore.handleReset?.();

    expect(pageStore.visibleTemplates).toStrictEqual(pageStore.templates);
    expect(pageStore.searchTerm).toBe('');
  });
});
