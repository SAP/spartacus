/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitLevelOrderDetailModule } from './unit-level-order-detail/unit-level-order-detail.module';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';

@NgModule({
  imports: [
    RouterModule,
    UnitLevelOrderHistoryModule,
    UnitLevelOrderDetailModule,
  ],
})
export class UnitOrderComponentsModule {}
