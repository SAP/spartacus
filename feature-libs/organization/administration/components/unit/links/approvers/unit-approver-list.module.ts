/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitAssignedApproverListComponent } from './assigned/unit-assigned-approver-list.component';
import { UnitApproverListComponent } from './unit-approver-list.component';

@NgModule({
  imports: [I18nModule, RouterModule, SubListModule],
  declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent],
})
export class UnitApproverListModule {}
