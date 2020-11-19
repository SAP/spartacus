module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
};
