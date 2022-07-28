import { NgModule } from '@angular/core';
import { PageMetaResolver, provideDefaultConfig } from '@spartacus/core';
import { defaultCustomerTicketingConfig } from './config';
import { CustomerTicketDetailsPageMetaResolver } from './services/customer-ticket-details-page-meta.resolver';

@NgModule({
  providers: [
    CustomerTicketDetailsPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CustomerTicketDetailsPageMetaResolver,
      multi: true,
    },
    provideDefaultConfig(defaultCustomerTicketingConfig),
  ],
})
export class CustomerTicketingCoreModule {}
