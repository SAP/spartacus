/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import {
  OrderDetailItemsComponent,
  OrderDetailTotalsComponent,
  OrderDetailsService,
} from '@spartacus/order/components';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { UnitLevelOrderDetailService } from './unit-level-order-detail.service';
import {
  UnitLevelOrderOverviewComponent,
  UnitLevelOrderOverviewModule,
} from './unit-level-order-overview';

@NgModule({
  imports: [CommonModule, UnitLevelOrderOverviewModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        UnitLevelOrderDetailsOverviewComponent: {
          component: UnitLevelOrderOverviewComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
        UnitLevelOrderDetailsItemsComponent: {
          component: OrderDetailItemsComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: UnitLevelOrderDetailService,
            },
          ],
        },
        UnitLevelOrderDetailsTotalsComponent: {
          component: OrderDetailTotalsComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: UnitLevelOrderDetailService,
            },
          ],
        },
      },
    } as CmsConfig),
  ],
})
export class UnitLevelOrderDetailModule {}
