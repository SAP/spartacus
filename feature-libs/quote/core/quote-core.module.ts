/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler, provideDefaultConfig } from '@spartacus/core';
import { QuoteConnector } from './connectors/quote.connector';
import { QuoteCartEventListener } from './event/quote-cart-event.listener';
import { facadeProviders } from './facade/facade-providers';
import { QuoteBadRequestHandler } from './http-interceptors/quote-bad-request.handler';
import { QuoteNotFoundHandler } from './http-interceptors/quote-not-found.handler';
import { defaultQuoteCoreConfig } from './config/default-quote.core.config';

@NgModule({
  providers: [
    ...facadeProviders,
    QuoteConnector,
    {
      provide: HttpErrorHandler,
      useExisting: QuoteBadRequestHandler,
      multi: true,
    },
    {
      provide: HttpErrorHandler,
      useExisting: QuoteNotFoundHandler,
      multi: true,
    },
    provideDefaultConfig(defaultQuoteCoreConfig),
  ],
})
export class QuoteCoreModule {
  constructor(_quoteAddedToCartEventListener: QuoteCartEventListener) {
    // Intentional empty constructor
  }
}
