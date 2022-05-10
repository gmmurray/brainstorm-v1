export const mockLocationProperty = (property: keyof Window['location']) => {
  if (typeof window === 'undefined') {
    return;
  }

  delete (window as any).location;
  (window.location as any) = { [property]: jest.fn() };
};
