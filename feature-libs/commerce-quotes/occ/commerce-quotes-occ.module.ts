import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommerceQuotesAdapter } from '../core/connectors';
import { OccCommerceQuotesAdapter } from './adapters';
import { defaultOccCommerceQuotesConfig } from './adapters/default-occ-commerce-quotes-config';

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
