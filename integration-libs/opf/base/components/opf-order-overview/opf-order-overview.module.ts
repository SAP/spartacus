/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  OrderConfirmationGuard,
  OrderDetailsModule,
  OrderDetailsService,
} from '@spartacus/order/components';
import { CardModule } from '@spartacus/storefront';

import { OrderFacade } from '@spartacus/order/root';
import { OpfOrderOverviewComponent } from './opf-order-overview.component';

// const moduleComponents = [
//   OpfOrderOverviewComponent,
//   OpfOrderDetailBillingComponent,
// ];

@NgModule({
  declarations: [OpfOrderOverviewComponent],
  exports: [OpfOrderOverviewComponent],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        OrderConfirmationOverviewComponent: {
          component: OpfOrderOverviewComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderFacade,
            },
          ],
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],
  imports: [CardModule, CommonModule, I18nModule, OrderDetailsModule],
})
export class OpfOrderOverviewsModule {}
