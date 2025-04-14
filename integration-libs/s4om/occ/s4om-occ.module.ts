/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccS4omOrderAttachmentsAdapter } from './adapters';
import { defaultOccS4omConfig } from './config';
import { S4omOrderAttachmentsAdapter } from '../core/connector';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccS4omConfig),
    {
      provide: S4omOrderAttachmentsAdapter,
      useClass: OccS4omOrderAttachmentsAdapter,
    },
  ],
})
export class S4omOccModule {}
