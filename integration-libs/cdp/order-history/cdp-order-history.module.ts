/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { OrderHistoryAdapter } from '@spartacus/order/core';
import { CdpOrderHistoryAdapter } from './cdp-order-history.adapter';
import { CdpOrderHistoryComponent } from './cdp-order-history.component';
import { CdpOrderHistoryService } from './cdp-order-history.service';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: CdpOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  providers: [
    CdpOrderHistoryService,
    { provide: OrderHistoryAdapter, useClass: CdpOrderHistoryAdapter },
  ],
  exports: [CdpOrderHistoryComponent],
  declarations: [CdpOrderHistoryComponent],
})
export class CdpOrderHistoryModule {}
