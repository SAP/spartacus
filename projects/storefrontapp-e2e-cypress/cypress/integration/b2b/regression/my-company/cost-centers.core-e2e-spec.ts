import { costCenterConfig } from '../../../../helpers/b2b/my-company/config/cost-center.config';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

it(['my_company', 'cost_center'], 'should validate my company cost centers functionality', () => {
    testMyCompanyFeatureFromConfig(costCenterConfig, true);
});
