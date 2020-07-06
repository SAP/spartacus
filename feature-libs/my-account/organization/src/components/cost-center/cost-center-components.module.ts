import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { CostCenterAssignBudgetsModule } from './budgets/assign/cost-center-assign-budget.module';
import { CostCenterBudgetListModule } from './budgets/list/cost-center-budget-list.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfig,
} from './cost-center.config';
import { CostCenterCreateModule } from './create/cost-center-create.module';
import { CostCenterEditModule } from './edit/cost-center-edit.module';
import { CostCenterFormModule } from './form/cost-center-form.module';
import { CostCenterListModule } from './list/cost-center-list.module';

@NgModule({
  imports: [
    RouterModule,

    // refactor to use factory function
    ConfigModule.withConfig({
      ...costCenterRoutingConfig,
      ...costCenterCmsConfig,
      ...costCenterTableConfig,
    }),

    CostCenterAssignBudgetsModule,
    CostCenterBudgetListModule,
    CostCenterCreateModule,
    CostCenterEditModule,
    CostCenterFormModule,
    CostCenterListModule,
  ],
})
export class CostCenterComponentsModule {}
