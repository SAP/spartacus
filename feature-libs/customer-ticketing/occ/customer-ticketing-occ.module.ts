import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CustomerTicketingAdapter } from '@spartacus/customer-ticketing/core';
import { OccCustomerTicketingAdapter } from './adapters/occ-customer-ticketing.adapter';
import { defaultOccCustomerTicketingConfig } from './config/default-occ-customer-ticketing-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCustomerTicketingConfig),
    {
      provide: CustomerTicketingAdapter,
      useClass: OccCustomerTicketingAdapter,
    },
  ],
})
export class CustomerTicketingOccModule {}
