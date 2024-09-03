/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OpfCtaAdapter } from '@spartacus/opf/cta/core';
import { OccOpfCtaAdapter } from './adapters';
import { defaultOccOpfCtaConfig } from './config/default-occ-opf-cta-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOpfCtaConfig),
    {
      provide: OpfCtaAdapter,
      useClass: OccOpfCtaAdapter,
    },
  ],
})
export class OpfCtaOccModule {}
