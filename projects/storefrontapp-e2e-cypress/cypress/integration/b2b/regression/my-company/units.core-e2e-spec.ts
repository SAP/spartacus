import { unitConfig } from '../../../../helpers/b2b/my-company/config/unit';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

it(
  ['my_company', 'units', 'smoke_b2b'],
  'should validate my company units functionality',
  () => {
    testMyCompanyFeatureFromConfig(unitConfig, true);
  }
);
