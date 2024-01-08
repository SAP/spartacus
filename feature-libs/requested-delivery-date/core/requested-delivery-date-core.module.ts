/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { RequestedDeliveryDateFacade } from '@spartacus/requested-delivery-date/root';
import { RequestedDeliveryDateConnector } from './connectors/requested-delivery-date.connector';
import { RequestedDeliveryDateBadRequestHandler } from './http-interceptors/bad-request/requested-delivery-date-badrequest.handler';
import { RequestedDeliveryDateService } from './services';

@NgModule({
  imports: [],
  providers: [
    RequestedDeliveryDateService,
    {
      provide: RequestedDeliveryDateFacade,
      useExisting: RequestedDeliveryDateService,
    },
    {
      provide: HttpErrorHandler,
      useExisting: RequestedDeliveryDateBadRequestHandler,
      multi: true,
    },
    RequestedDeliveryDateConnector,
  ],
})
export class RequestedDeliveryDateCoreModule {}
