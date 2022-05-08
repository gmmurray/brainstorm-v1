module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/alpine/*',
    'src/routes/templates/templatesHandler.ts',
    'src/routes/ideas/ideasHandler.ts',
    'src/services/*',
  ],
};
