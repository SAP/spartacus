import { NgModule } from '@angular/core';
import { CommerceQuotesComponentsModule } from './components/commerce-quotes-components.module';
import { CommerceQuotesCoreModule } from './core/commerce-quotes-core.module';
import { CommerceQuotesOccModule } from './occ/commerce-quotes-occ.module';

@NgModule({
  imports: [
    CommerceQuotesComponentsModule,
    CommerceQuotesCoreModule,
    CommerceQuotesOccModule,
  ],
})
export class CommerceQuotesModule {}
