import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { FormNotificationModule } from '../shared/form/form-notification/form-notification.module';
import { OrganizationOutletModule } from '../shared/organization-outlet/organization-outlet.module';
import { CostCenterAssignBudgetsModule } from './cost-center-assign-budgets/cost-center-assign-budgets.module';
import { CostCenterBudgetModule } from './cost-center-budget/cost-center-budget.module';
import { CostCenterCreateModule } from './cost-center-create/cost-center-create.module';
import { CostCenterDetailsModule } from './cost-center-details/cost-center-details.module';
import { CostCenterEditModule } from './cost-center-edit/cost-center-edit.module';
import { CostCenterListModule } from './cost-center-list/cost-center-list.module';
import {
  costCenterCmsConfig,
  costCenterRoutingConfig,
  costCenterTableConfig,
} from './cost-center.config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ConfigModule.withConfig({
      ...costCenterRoutingConfig,
      ...costCenterCmsConfig,
      ...costCenterTableConfig,
    }),

    OrganizationOutletModule,
    FormNotificationModule,
    CostCenterListModule,
    CostCenterCreateModule,
    CostCenterDetailsModule,
    CostCenterEditModule,
    CostCenterBudgetModule,
    CostCenterAssignBudgetsModule,
  ],
})
export class CostCenterModule {}
