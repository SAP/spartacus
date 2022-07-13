import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CustomerTicketDetailsPageMetaResolver } from './services/customer-ticket-details-page-meta.resolver';

@NgModule({
  providers: [
    CustomerTicketDetailsPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CustomerTicketDetailsPageMetaResolver,
      multi: true,
    },
  ],
})
export class CustomerTicketingCoreModule {}
