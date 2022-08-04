import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CommerceQuotesAdapter,
  QUOTE_NORMALIZER,
} from '@spartacus/commerce-quotes/core';
import { OccCommerceQuotesAdapter } from './adapters/occ-commerce-quotes.adapter';
import { defaultOccCommerceQuotesConfig } from './config/default-occ-commerce-quotes-config';
import { OccQuoteNormalizer } from './adapters/converters/occ-quote-normalizer';

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
      useExisting: OccQuoteNormalizer,
      multi: true,
    },
  ],
})
export class CommerceQuotesOccModule {}
