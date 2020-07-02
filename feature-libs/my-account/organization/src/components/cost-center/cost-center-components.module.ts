import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { CostCenterAssignBudgetsModule } from './budgets/assign/cost-center-assign-budgets.module';
import { CostCenterBudgetsModule } from './budgets/list/cost-center-budgets.module';
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
