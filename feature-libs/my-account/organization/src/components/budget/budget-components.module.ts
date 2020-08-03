import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { BudgetCostCenterListModule } from './cost-centers/list/budget-cost-center-list.module';
import {
  budgetCmsConfig,
  budgetRoutingConfig,
  budgetTableConfigFactory,
} from './budget.config';
import { BudgetCreateModule } from './create/budget-create.module';
import { BudgetEditModule } from './edit/budget-edit.module';
import { BudgetFormModule } from './form/budget-form.module';
import { BudgetListModule } from './list/budget-list.module';

@NgModule({
  imports: [
    RouterModule,
    BudgetCostCenterListModule,
    BudgetCreateModule,
    BudgetEditModule,
    BudgetFormModule,
    BudgetListModule,
  ],
  providers: [
    provideDefaultConfig(budgetRoutingConfig),
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
