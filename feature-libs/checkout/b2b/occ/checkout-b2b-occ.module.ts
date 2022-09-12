/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutCostCenterAdapter,
  CheckoutPaymentTypeAdapter,
} from '@commerce-storefront-toolset/checkout/b2b/core';
import { provideDefaultConfig } from '@commerce-storefront-toolset/core';
import { OccCheckoutCostCenterAdapter } from './adapters/occ-checkout-cost-center.adapter';
import { OccCheckoutPaymentTypeAdapter } from './adapters/occ-checkout-payment-type.adapter';
import { defaultOccCheckoutB2BConfig } from './config/default-occ-checkout-b2b-config';
@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutB2BConfig),
    {
      provide: CheckoutPaymentTypeAdapter,
      useClass: OccCheckoutPaymentTypeAdapter,
    },
    {
      provide: CheckoutCostCenterAdapter,
      useClass: OccCheckoutCostCenterAdapter,
    },
  ],
})
export class CheckoutB2BOccModule {}
