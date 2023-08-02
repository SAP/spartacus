/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { QuoteConnector } from './connectors/quote.connector';
import { facadeProviders } from './facade/facade-providers';
import { QuoteBadRequestHandler } from './http-interceptors/quote-bad-request.handler';
import { QuoteAddedToCartEventListener } from './event/quote-added-to-cart-event.listener';

@NgModule({
  providers: [
    ...facadeProviders,
    QuoteConnector,
    {
      provide: HttpErrorHandler,
      useExisting: QuoteBadRequestHandler,
      multi: true,
    },
  ],
})
export class QuoteCoreModule {
  constructor(_quoteAddedToCartEventListener: QuoteAddedToCartEventListener) {
    // Intentional empty constructor
  }
}
