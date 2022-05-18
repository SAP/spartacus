import { userGroupConfig } from '../../../../helpers/b2b/my-company/config/user-group';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

describe(`My Company - User Groups`, () => {
  testMyCompanyFeatureFromConfig(userGroupConfig, true);
});
