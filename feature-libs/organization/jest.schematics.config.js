const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.schematics.spec');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },

  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage/organization/schematics',
  coverageThreshold: {
    global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
    }
  },

  roots: ['<rootDir>/schematics'],
  modulePaths: ['<rootDir>/../../projects/schematics'],
  testMatch: ['**/+(*_)+(spec).+(ts)'],
  moduleFileExtensions: [ "js", "ts", "json" ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
