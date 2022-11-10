/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CustomerTicketingConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { BadTicketRequestHandler } from './http-interceptors/handlers/bad-ticket-request.handler';

@NgModule({
  providers: [
    ...facadeProviders,
    {
      provide: HttpErrorHandler,
      useExisting: BadTicketRequestHandler,
      multi: true,
    },
    CustomerTicketingConnector
  ],
})
export class CustomerTicketingCoreModule {}
