import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrganizationListModule } from '../shared/organization-list/organization-list.module';
import { CostCenterAssignBudgetsModule } from './budgets/assign/cost-center-assign-budgets.module';
import { CostCenterBudgetListModule } from './budgets/list/cost-center-budget-list.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';
import { CostCenterCreateModule } from './create/cost-center-create.module';
import { CostCenterDetailsModule } from './details/cost-center-details.module';
import { CostCenterEditModule } from './edit/cost-center-edit.module';
import { CostCenterFormModule } from './form/cost-center-form.module';

@NgModule({
  imports: [
    RouterModule,
    CostCenterAssignBudgetsModule,
    CostCenterBudgetListModule,
    CostCenterCreateModule,
    CostCenterEditModule,
    CostCenterFormModule,
    CostCenterDetailsModule,

    OrganizationListModule,
  ],
  providers: [
    provideDefaultConfig(costCenterRoutingConfig),
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
