import { budgetConfig } from '../../../../helpers/b2b/my-company/config/budget.config';
import { testMyCompanyFeatureFromConfig } from '../../../../helpers/b2b/my-company/my-company.utils';

it(['my_company', 'budgets'], 'should validate my company budgets functionality', () => {
    testMyCompanyFeatureFromConfig(budgetConfig, true);
});
