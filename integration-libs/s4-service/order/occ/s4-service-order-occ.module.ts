/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CancelServiceOrderAdapter,
  RescheduleServiceOrderAdapter,
} from '../core/connector';
import {
  OccCancelServiceOrderAdapter,
  OccRescheduleServiceOrderAdapter,
} from './adapters';
import { defaultOccServiceOrderConfig } from './config/default-occ-s4-service-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccServiceOrderConfig),
    {
      provide: CancelServiceOrderAdapter,
      useClass: OccCancelServiceOrderAdapter,
    },
    {
      provide: RescheduleServiceOrderAdapter,
      useClass: OccRescheduleServiceOrderAdapter,
    },
  ],
})
export class S4ServiceOrderOccModule {}
