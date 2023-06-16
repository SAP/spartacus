/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { QuoteConnector } from './connectors/quote.connector';
import { facadeProviders } from './facade/facade-providers';
import { CommerceQuotesBadRequestHandler } from './http-interceptors/bad-request.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    QuoteConnector,
    {
      provide: HttpErrorHandler,
      useExisting: CommerceQuotesBadRequestHandler,
      multi: true,
    },
  ],
})
export class CommerceQuotesCoreModule {}
