import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CommerceQuotesAdapter,
  QUOTE_NORMALIZER,
} from '@spartacus/commerce-quotes/core';
import { OccCommerceQuotesAdapter } from './adapters/occ-commerce-quotes.adapter';
import { defaultOccCommerceQuotesConfig } from './config/default-occ-commerce-quotes-config';
import { OccQuoteEntryNormalizer } from './adapters/converters/occ-quote-entry-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCommerceQuotesConfig),
    {
      provide: CommerceQuotesAdapter,
      useClass: OccCommerceQuotesAdapter,
    },
    {
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteEntryNormalizer,
      multi: true,
    },
  ],
})
export class CommerceQuotesOccModule {}
