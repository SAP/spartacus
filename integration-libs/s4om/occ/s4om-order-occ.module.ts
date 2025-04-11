/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderAttachmentsAdapter } from '../core';
import { OccOrderAttachmentsAdapter } from './adapters';
import { defaultOccS4OMOrderConfig } from './config/default-occ-s4om-order-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccS4OMOrderConfig),
    {
      provide: OrderAttachmentsAdapter,
      useClass: OccOrderAttachmentsAdapter,
    },
  ],
})
export class S4omOrderOccModule {
}
