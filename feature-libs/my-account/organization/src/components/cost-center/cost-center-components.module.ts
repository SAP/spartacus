import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CostCenterAssignBudgetsModule } from './budgets/assign/cost-center-assign-budgets.module';
import { CostCenterBudgetListModule } from './budgets/list/cost-center-budget-list.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';
import { CostCenterCreateModule } from './create/cost-center-create.module';
import { CostCenterEditModule } from './edit/cost-center-edit.module';
import { CostCenterFormModule } from './form/cost-center-form.module';
import { CostCenterListModule } from './list/cost-center-list.module';
import { CostCenterDetailsModule } from './details/cost-center-details.module';

@NgModule({
  imports: [
    RouterModule,
    CostCenterAssignBudgetsModule,
    CostCenterBudgetListModule,
    CostCenterCreateModule,
    CostCenterEditModule,
    CostCenterFormModule,
    CostCenterListModule,
    CostCenterDetailsModule,
  ],
  providers: [
    provideDefaultConfig(costCenterRoutingConfig),
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
