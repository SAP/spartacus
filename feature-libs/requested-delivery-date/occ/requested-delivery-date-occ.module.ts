/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { RequestedDeliveryDateAdapter } from '@spartacus/requested-delivery-date/core';
import { OccRequestedDeliveryDateAdapter } from './adapters/occ-requested-delivery-date.adapter';
import { defaultOccRequestedDeliveryDateConfig } from './config/default-occ-requested-delivery-date-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccRequestedDeliveryDateConfig),
    {
      provide: RequestedDeliveryDateAdapter,
      useClass: OccRequestedDeliveryDateAdapter,
    },
  ],
})
export class RequestedDeliveryDateOccModule {}
