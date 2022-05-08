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
});
