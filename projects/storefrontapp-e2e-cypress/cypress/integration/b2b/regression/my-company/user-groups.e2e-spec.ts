import { userGroupConfig } from '../../../../helpers/b2b/my-company/config/user-group';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

// TODO: Reenable e2e test when new backend server is in place (replacing dev0 with devci)
describe.skip(`My Company - User Groups`, () => {
  testMyCompanyFeatureFromConfig(userGroupConfig);
});
