import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { BudgetDetailsCellModule } from '../budget/details-cell/budget-details-cell.module';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { CostCenterBudgetListModule } from './budgets/cost-center-budget-list.module';
import {
  costCenterCmsConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';
import { CostCenterDetailsModule } from './details/cost-center-details.module';
import { CostCenterFormModule } from './form/cost-center-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    CostCenterDetailsModule,
    CostCenterFormModule,
    CostCenterBudgetListModule,
    BudgetDetailsCellModule,
  ],
  providers: [
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
