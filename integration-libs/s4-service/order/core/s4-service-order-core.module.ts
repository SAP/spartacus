/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CxDatePipe } from '@spartacus/core';
import {
  CancelServiceOrderFacade,
  RescheduleServiceOrderFacade,
} from '@spartacus/s4-service/root';
import {
  CancelServiceOrderConnector,
  RescheduleServiceOrderConnector,
} from './connector';
import {
  CancelServiceOrderService,
  RescheduleServiceOrderService,
} from './facade';

@NgModule({
  providers: [
    CxDatePipe,
    CancelServiceOrderService,
    {
      provide: CancelServiceOrderFacade,
      useExisting: CancelServiceOrderService,
    },
    CancelServiceOrderConnector,
    RescheduleServiceOrderService,
    {
      provide: RescheduleServiceOrderFacade,
      useExisting: RescheduleServiceOrderService,
    },
    RescheduleServiceOrderConnector,
  ],
})
export class S4ServiceOrderCoreModule {}
