/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutPaymentTypeConnector } from '@spartacus/checkout/b2b/core';
import {
  CheckoutBillingAddressConnector,
  CheckoutConnector,
  CheckoutDeliveryAddressConnector,
  CheckoutDeliveryModesConnector,
} from '@spartacus/checkout/base/core';
import { OpfPaymentCoreModule } from '@spartacus/opf/payment/core';
import { OrderConnector } from '@spartacus/order/core';
import { environment } from '../../../environments/environment';
import { CartCheckoutPocComponent } from './cart-checkout-poc.component';
import { CartCheckoutPocService } from './cart-checkout-poc.service';

/**
 * Scoped checkout/order/OPF providers for the POC banner only.
 * OPF modules must not be registered at app root (conflicts with auth / lazy OPF).
 */
@NgModule({
  imports: [CartCheckoutPocComponent, OpfPaymentCoreModule],
  providers: [
    CartCheckoutPocService,
    CheckoutDeliveryAddressConnector,
    CheckoutDeliveryModesConnector,
    CheckoutBillingAddressConnector,
    CheckoutConnector,
    OrderConnector,
    ...(environment.b2b ? [CheckoutPaymentTypeConnector] : []),
  ],
  exports: [CartCheckoutPocComponent],
})
export class CartCheckoutPocModule {}
