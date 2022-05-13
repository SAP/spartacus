import { userGroupConfig } from '../../../../helpers/b2b/my-company/config/user-group';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

describe(`My Company - User Groups`, () => {
  it(
    ['my_company', 'user_groups'],
    'should validate my company user groups functionality',
    () => {
      testMyCompanyFeatureFromConfig(userGroupConfig, true);
    }
  );
});
