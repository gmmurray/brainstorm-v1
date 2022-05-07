module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/alpine/*',
    'src/routes/templates/*',
    // 'src/loaders/*',
    // 'src/models/*',
    'src/services/*',
    // 'src/app.ts',
  ],
};
