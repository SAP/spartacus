const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.schematics.spec');
const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/schematics'],
  modulePaths: ['<rootDir>/../../projects/schematics'],
  testMatch: ['**/+(*_)+(spec).+(ts)'],
  coverageDirectory: 'coverage/organization/schematics',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
