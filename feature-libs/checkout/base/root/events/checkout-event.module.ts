/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';
import { CheckoutLegacyStoreEventListener } from './checkout-legacy-store-event.listener';
import { CheckoutPaymentEventListener } from './checkout-payment-event.listener';
import { CheckoutPlaceOrderEventListener } from './checkout-place-order-event.listener';
import { CheckoutQueryEventListener } from './checkout-query-event.listener';

@NgModule({})
export class CheckoutEventModule {
  constructor(
    _checkoutQueryEventListener: CheckoutQueryEventListener,
    _checkoutDeliveryAddressEventListener: CheckoutDeliveryAddressEventListener,
    _checkoutDeliveryModeEventListener: CheckoutDeliveryModeEventListener,
    _checkoutPaymentEventListener: CheckoutPaymentEventListener,
    _checkoutPlaceOrderEventListener: CheckoutPlaceOrderEventListener,
    _checkoutLegacyStoreEventListener: CheckoutLegacyStoreEventListener
  ) {
    // Intentional empty constructor
  }
}
