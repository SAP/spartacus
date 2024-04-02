/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { CostCenterAssignedBudgetListComponent } from './assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';

@NgModule({
  imports: [ListModule, I18nModule, RouterModule, SubListModule],
  declarations: [
    CostCenterAssignedBudgetListComponent,
    CostCenterBudgetListComponent,
  ],
})
export class CostCenterBudgetListModule {}
