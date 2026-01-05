/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfCtaAdapter } from '@spartacus/opf/cta/core';
import { OpfApiCtaAdapter } from './adapters';
import { defaultOpfApiCtaConfig } from './config/default-opf-api-cta-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOpfApiCtaConfig),
    {
      provide: OpfCtaAdapter,
      useClass: OpfApiCtaAdapter,
    },
  ],
})
export class OpfApiCtaModule {}
