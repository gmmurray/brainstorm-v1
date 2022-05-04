import { initHomePage } from './home';

describe('home page scripts', () => {
  test('returns empty object if nothing provided', () => {
    expect(initHomePage()).toStrictEqual({});
  });
});
