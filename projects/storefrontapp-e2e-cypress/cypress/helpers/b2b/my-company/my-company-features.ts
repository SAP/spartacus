import { assignmentsTest } from './features/assignments';
import { createTest } from './features/create';
import { disableTest } from './features/disable';
import { listTest } from './features/list';
import { nestedListTest } from './features/nested-list';
import { updateTest } from './features/update';
import { userPasswordTest } from './features/user-password';
import { MyCompanyConfig, MY_COMPANY_FEATURE } from './models';

const testMapping = {
  [MY_COMPANY_FEATURE.LIST]: listTest,
  [MY_COMPANY_FEATURE.NESTED_LIST]: nestedListTest,
  [MY_COMPANY_FEATURE.CREATE]: createTest,
  [MY_COMPANY_FEATURE.UPDATE]: updateTest,
  [MY_COMPANY_FEATURE.DISABLE]: disableTest,
  [MY_COMPANY_FEATURE.ASSIGNMENTS]: assignmentsTest,
  [MY_COMPANY_FEATURE.USER_PASSWORD]: userPasswordTest,
};

const coreTestMapping = {
  [MY_COMPANY_FEATURE.LIST]: listTest,
  [MY_COMPANY_FEATURE.CREATE]: createTest,
  [MY_COMPANY_FEATURE.UPDATE]: updateTest,
  [MY_COMPANY_FEATURE.DISABLE]: disableTest,
};

export function testFeaturesFromConfig(config: MyCompanyConfig) {
  if (config.features?.length) {
    describe('My Company Features', () => {
      config.features.forEach((featureToggle: string) => {
        testMapping[featureToggle](config);
      });
    });
  }
}

export function testCoreFeaturesFromConfig(config: MyCompanyConfig) {
  if (config.features?.length) {
    describe('My Company Core Features', () => {
      config.coreFeatures.forEach((featureToggle: string) => {
        testMapping[featureToggle](config);
      });
    });
  }
}
