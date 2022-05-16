import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommerceQuotesAdapter } from '@spartacus/commerce-quotes/core';
import { OccCommerceQuotesAdapter } from './adapters/occ-commerce-quotes.adapter';
import { defaultOccCommerceQuotesConfig } from './config/default-occ-commerce-quotes-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCommerceQuotesConfig),
    {
      provide: CommerceQuotesAdapter,
      useClass: OccCommerceQuotesAdapter,
    },
  ],
})
export class CommerceQuotesOccModule {}
