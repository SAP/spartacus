/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CheckoutDeliveryAddressConnector } from './connectors/checkout-delivery-address/checkout-delivery-address.connector';
import { CheckoutDeliveryModesConnector } from './connectors/checkout-delivery-modes/checkout-delivery-modes.connector';
import { CheckoutPaymentConnector } from './connectors/checkout-payment/checkout-payment.connector';
import { CheckoutConnector } from './connectors/checkout/checkout.connector';
import { facadeProviders } from './facade/facade-providers';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';

@NgModule({
  providers: [
    ...facadeProviders,
    CheckoutDeliveryAddressConnector,
    CheckoutDeliveryModesConnector,
    CheckoutPaymentConnector,
    CheckoutConnector,
    CheckoutPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutCoreModule {}
