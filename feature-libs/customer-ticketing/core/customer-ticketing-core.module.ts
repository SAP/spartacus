import { NgModule } from '@angular/core';
import { CustomerTicketingConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders, CustomerTicketingConnector],
})

export class CustomerTicketingCoreModule {}
