import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import {
  CustomerTicketingCreateModule,
  defaultCustomerTicketingFormLayoutConfig,
} from './customer-ticketing-create';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import { CustomerTicketingListModule } from './customer-ticketing-list';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingListModule,
    CustomerTicketingCreateModule,
  ],
  exports: [],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
