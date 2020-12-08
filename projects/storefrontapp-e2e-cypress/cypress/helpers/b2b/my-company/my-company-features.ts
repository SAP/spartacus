import { userPasswordTest } from './features/user-password';
import { MyCompanyConfig, MY_COMPANY_FEATURE } from './models';

const testMapping = {
  [MY_COMPANY_FEATURE.USER_PASSWORD]: userPasswordTest,
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
