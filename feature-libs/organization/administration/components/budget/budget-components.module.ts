import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { budgetCmsConfig, budgetTableConfigFactory } from './budget.config';
import { BudgetCostCenterListModule } from './cost-centers/budget-cost-center-list.module';
import { BudgetDetailsModule } from './details/budget-details.module';
import { BudgetFormModule } from './form/budget-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    BudgetDetailsModule,
    BudgetFormModule,
    BudgetCostCenterListModule,
  ],
  providers: [
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
