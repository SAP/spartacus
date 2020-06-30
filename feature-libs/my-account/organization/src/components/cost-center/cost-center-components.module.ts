import { NgModule } from '@angular/core';
import { CostCenterAssignBudgetsModule } from './assign-budgets/cost-center-assign-budgets.module';
import { CostCenterBudgetsModule } from './budgets/cost-center-budgets.module';
import { CostCenterCreateModule } from './create/cost-center-create.module';
import { CostCenterEditModule } from './edit/cost-center-edit.module';
import { CostCenterFormModule } from './form/cost-center-form.module';
import { CostCenterListModule } from './list/cost-center-list.module';
import { ConfigModule } from '@spartacus/core';
import {
  costCenterRoutingConfig,
  costCenterCmsConfig,
  costCenterTableConfig,
} from './cost-center.config';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    ConfigModule.withConfig({
      ...costCenterRoutingConfig,
      ...costCenterCmsConfig,
      ...costCenterTableConfig,
    }),

    CostCenterAssignBudgetsModule,
    CostCenterBudgetsModule,
    CostCenterCreateModule,
    CostCenterEditModule,
    CostCenterFormModule,
    CostCenterListModule,
  ],
})
export class CostCenterComponentsModule {}
