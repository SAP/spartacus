import { NgModule } from '@angular/core';
import { CommerceQuotesComponentsModule } from '@spartacus/commerce-quotes/components';
import { CommerceQuotesCoreModule } from '@spartacus/commerce-quotes/core';
import { CommerceQuotesOccModule } from '@spartacus/commerce-quotes/occ';

@NgModule({
  imports: [
    CommerceQuotesComponentsModule,
    CommerceQuotesCoreModule,
    CommerceQuotesOccModule,
  ],
})
export class CommerceQuotesModule {}
