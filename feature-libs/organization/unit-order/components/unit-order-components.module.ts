/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitOrderDetailsOrderEntriesContextToken } from '@spartacus/organization/unit-order/root';
import { UnitOrderDetailsOrderEntriesContext } from './page-context/unit-order-details-order-entries.context';
import { UnitLevelOrderDetailModule } from './unit-level-order-detail/unit-level-order-detail.module';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';

@NgModule({
  imports: [
    RouterModule,
    UnitLevelOrderHistoryModule,
    UnitLevelOrderDetailModule,
  ],
  providers: [
    {
      provide: UnitOrderDetailsOrderEntriesContextToken,
      useExisting: UnitOrderDetailsOrderEntriesContext,
    },
  ],
})
export class UnitOrderComponentsModule {}
