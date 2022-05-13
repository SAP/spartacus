import { userConfig } from '../../../../helpers/b2b/my-company/config/user';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

it(
  ['my_company', 'users', 'smoke_b2b'],
  'should validate my company users functionality',
  () => {
    testMyCompanyFeatureFromConfig(userConfig, true);
  }
);
