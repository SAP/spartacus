/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { QuoteAdapter, QUOTE_NORMALIZER } from '@spartacus/quote/core';

import { OccQuoteAdapter } from './adapters/occ-quote.adapter';
import { defaultOccQuoteConfig } from './config/default-occ-quote-config';
import { OccQuoteActionNormalizer } from './converters/occ-quote-action-normalizer';
import { OccQuoteEntryNormalizer } from './converters/occ-quote-entry-normalizer';

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
    {
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteEntryNormalizer,
      multi: true,
    },
  ],
})
export class QuoteOccModule {}
