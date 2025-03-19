/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfBaseAdapter } from '@spartacus/opf/base/core';
import { OpfApiBaseAdapter } from './adapters';
import { defaultOpfApiBaseConfig } from './config/default-opf-api-base-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOpfApiBaseConfig),
    {
      provide: OpfBaseAdapter,
      useClass: OpfApiBaseAdapter,
    },
  ],
})
export class OpfApiBaseModule {}
