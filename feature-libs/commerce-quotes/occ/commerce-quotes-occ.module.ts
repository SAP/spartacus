import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccCommerceQuotesConfig } from './adapters/default-occ-commerce-quotes-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultOccCommerceQuotesConfig)],
})
export class AsmOccModule {}
