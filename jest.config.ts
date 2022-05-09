module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/alpine/ideas/*',
    'src/alpine/templates/*',
    'src/routes/templates/templatesHandler.ts',
    'src/routes/ideas/ideasHandler.ts',
    'src/routes/home/homeHandler.ts',
    'src/services/*',
  ],
};
