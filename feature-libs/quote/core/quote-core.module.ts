/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultQuoteCoreConfig } from './config/default-quote.core.config';
import { QuoteConnector } from './connectors/quote.connector';
import { QuoteCartEventListener } from './event/quote-cart-event.listener';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    ...facadeProviders,
    QuoteConnector,
    provideDefaultConfig(defaultQuoteCoreConfig),
  ],
})
export class QuoteCoreModule {
  constructor(_quoteAddedToCartEventListener: QuoteCartEventListener) {
    // Intentional empty constructor
  }
}
