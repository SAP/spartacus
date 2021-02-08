import { unitConfig } from '../../../../helpers/b2b/my-company/config/unit';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

// TODO: Reenable e2e test when unit clean up procedure is in place.
// https://github.com/SAP/spartacus/issues/10958
describe.skip(`My Company - Units`, () => {
  testMyCompanyFeatureFromConfig(unitConfig);
});
