/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CheckoutCostCenterConnector } from './connectors/checkout-cost-center/checkout-cost-center.connector';
import { CheckoutPaymentTypeConnector } from './connectors/checkout-payment-type/checkout-payment-type.connector';
import { facadeProviders } from './facade/facade-providers';
import { BadCostCenterRequestHandler } from './http-interceptors/bad-request/bad-cost-center-request.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    CheckoutCostCenterConnector,
    CheckoutPaymentTypeConnector,
    {
      provide: HttpErrorHandler,
      useExisting: BadCostCenterRequestHandler,
      multi: true,
    },
  ],
})
export class CheckoutB2BCoreModule {}
