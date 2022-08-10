import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './customer-ticketing-close';
import {
  CustomerTicketingCreateModule,
  defaultCustomerTicketingCreateFormLayoutConfig,
} from './customer-ticketing-create';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import { CustomerTicketingListModule } from './customer-ticketing-list';
import {
  CustomerTicketingReopenModule,
  defaultCustomerTicketingFormLayoutConfig,
} from './customer-ticketing-reopen';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingCloseModule,
    CustomerTicketingReopenModule,
    CustomerTicketingListModule,
    CustomerTicketingCreateModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig),
    provideDefaultConfig(defaultCustomerTicketingCreateFormLayoutConfig),
  ],
})
export class CustomerTicketingComponentsModule {}
