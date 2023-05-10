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
import { OrderConfirmationGuard } from '@spartacus/order/components';
import { CardModule } from '@spartacus/storefront';
import { OpfOrderDetailBillingComponent } from './opf-order-detail-billing/opf-order-detail-billing.component';

import { OpfOrderOverviewComponent } from './opf-order-overview/opf-order-overview.component';

const moduleComponents = [
  OpfOrderOverviewComponent,
  OpfOrderDetailBillingComponent,
];

@NgModule({
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        OpfOrderConfirmationOverviewComponent: {
          component: OpfOrderOverviewComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],
  imports: [CardModule, CommonModule, I18nModule],
})
export class OpfOrderDetailsModule {}
