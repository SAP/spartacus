/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CommerceQuotesConnector } from './connectors/commerce-quotes.connector';
import { facadeProviders } from './facade/facade-providers';
import { CommerceQuotesBadRequestHandler } from './http-interceptors/bad-request.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    CommerceQuotesConnector,
    {
      provide: HttpErrorHandler,
      useExisting: CommerceQuotesBadRequestHandler,
      multi: true,
    },
  ],
})
export class CommerceQuotesCoreModule {}
