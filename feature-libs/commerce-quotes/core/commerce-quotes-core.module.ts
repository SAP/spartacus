import { NgModule } from '@angular/core';
import { CommerceQuotesConnector } from './connectors/commerce-quotes.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders, CommerceQuotesConnector],
})
export class CommerceQuotesCoreModule {}
