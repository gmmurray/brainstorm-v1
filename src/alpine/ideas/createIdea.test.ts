import { createIdeaPageStoreDefault, initCreateIdeaPage } from './createIdea';

import { mockTemplate1 } from '../../mock/templates';
import { mockUser } from '../../mock/users';

describe('create idea page scrips', () => {
  it('returns empty object if nothing provided', () => {
    expect(initCreateIdeaPage()).toStrictEqual({});
  });

  it('initializes properties', () => {
    const pageStore = initCreateIdeaPage({
      user: mockUser,
      templates: [mockTemplate1],
    });
    const { user, templates, selectedTemplate, fields, loading, message } =
      pageStore;

    expect(user).toBe(mockUser);
    expect(templates).toStrictEqual(createIdeaPageStoreDefault.templates);
    expect(selectedTemplate).toBe(createIdeaPageStoreDefault.selectedTemplate);
    expect(fields).toBe(createIdeaPageStoreDefault.fields);
    expect(loading).toBe(createIdeaPageStoreDefault.loading);
    expect(message).toBe('123');
  });
});
