import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import {
  budgetCmsConfig,
  budgetRoutingConfig,
  budgetTableConfigFactory,
} from './budget.config';
import { BudgetCostCenterListModule } from './cost-centers/list/budget-cost-center-list.module';
import { BudgetDetailsModule } from './details';
import { BudgetFormModule } from './form/budget-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    BudgetDetailsModule,
    BudgetFormModule,
    BudgetCostCenterListModule,
  ],
  providers: [
    provideDefaultConfig(budgetRoutingConfig),
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
