const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.spec');
const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/administration', '<rootDir>/order-approval'],
  modulePaths: ['<rootDir>/../../projects/core/public_api', '<rootDir>/../../projects/storefrontlib/src/public_api'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  coverageDirectory: 'coverage/organization',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
