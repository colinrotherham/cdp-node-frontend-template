module.exports = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  restoreMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: [['github-actions', { silent: false }], 'summary'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/test-helpers',
    '<rootDir>/mock-api'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
