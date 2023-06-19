/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  QuoteAdapter,
  QUOTE_NORMALIZER,
} from 'feature-libs/quote/core/public_api';
import { OccQuoteAdapter } from './adapters/occ-quote.adapter';
import { defaultOccQuoteConfig } from './config/default-occ-quote-config';
import { OccQuoteActionNormalizer } from './converters/occ-quote-action-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccQuoteConfig),
    {
      provide: QuoteAdapter,
      useClass: OccQuoteAdapter,
    },
    {
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteActionNormalizer,
      multi: true,
    },
  ],
})
export class QuoteOccModule {}
