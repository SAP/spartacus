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
} from '@spartacus/commerce-quotes/core';
import { OccCommerceQuotesAdapter } from './adapters/occ-commerce-quotes.adapter';
import { defaultOccCommerceQuotesConfig } from './config/default-occ-commerce-quotes-config';
import { OccQuoteActionNormalizer } from './converters/occ-quote-action-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCommerceQuotesConfig),
    {
      provide: QuoteAdapter,
      useClass: OccCommerceQuotesAdapter,
    },
    {
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteActionNormalizer,
      multi: true,
    },
  ],
})
export class CommerceQuotesOccModule {}
