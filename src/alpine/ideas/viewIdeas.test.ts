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
  });
});
