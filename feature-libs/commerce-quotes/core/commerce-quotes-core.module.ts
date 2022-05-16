import { NgModule } from '@angular/core';
import { CommerceQuotesConnector } from './connectors/commerce-quotes.connector';

@NgModule({
  providers: [CommerceQuotesConnector],
})
export class CommerceQuotesCoreModule {}
