import { Template } from '../models/template';
import { initHomePage } from './home';
import { mockIdea } from '../mock/mockIdeas';
import { mockTemplate1 } from '../mock/templates';
import { mockUser } from '../mock/users';

describe('home page scripts', () => {
  test('returns empty object if nothing provided', () => {
    expect(initHomePage()).toStrictEqual({});
  });
  test('initializes properties', () => {
    const pageStore = initHomePage({
      ideas: [mockIdea],
      templates: [mockTemplate1] as Template[],
      user: mockUser,
    });

    const { user, ideas, templates } = pageStore;
    expect(user).toStrictEqual(mockUser);
    expect(ideas).toStrictEqual([mockIdea]);
    expect(templates).toStrictEqual([mockTemplate1]);
  });
});
