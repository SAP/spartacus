/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { UnitLevelOrderOverviewComponent as UnitLevelOrderOverviewComponent } from './unit-level-order-overview.component';

@NgModule({
  imports: [CommonModule, I18nModule, CardModule],
  declarations: [UnitLevelOrderOverviewComponent],
  exports: [UnitLevelOrderOverviewComponent],
})
export class UnitLevelOrderOverviewModule {}
