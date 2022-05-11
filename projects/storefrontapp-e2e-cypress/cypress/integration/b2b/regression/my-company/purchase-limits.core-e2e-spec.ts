import { purchaseLimitConfigs } from '../../../../helpers/b2b/my-company/config/purchase-limit';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

purchaseLimitConfigs.forEach((config) => {
  it(['my_company', 'purchase limists'], 'should validate my company purchase limits functionality', () => {
    testMyCompanyFeatureFromConfig(config, true);
  });
});
