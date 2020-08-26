import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrganizationListModule } from '../shared/organization-list/organization-list.module';
import {
  budgetCmsConfig,
  budgetRoutingConfig,
  budgetTableConfigFactory,
} from './budget.config';
import { BudgetCostCenterListModule } from './cost-centers/list/budget-cost-center-list.module';
import { BudgetCreateModule } from './create/budget-create.module';
import { BudgetEditModule } from './edit/budget-edit.module';
import { BudgetFormModule } from './form/budget-form.module';

@NgModule({
  imports: [
    RouterModule,
    BudgetCostCenterListModule,
    BudgetCreateModule,
    BudgetEditModule,
    BudgetFormModule,
    // BudgetListModule,

    OrganizationListModule,
  ],
  providers: [
    provideDefaultConfig(budgetRoutingConfig),
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
