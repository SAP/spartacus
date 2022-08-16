import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './customer-ticketing-close';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import {
  CustomerTicketingReopenModule,
  defaultCustomerTicketingFormLayoutConfig,
} from './customer-ticketing-reopen';
import { CustomerTicketingListModule } from './customer-ticketing-list';
import { CustomerTicketingMessagesModule } from './customer-ticketing-messages';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingCloseModule,
    CustomerTicketingReopenModule,
    CustomerTicketingListModule,
    CustomerTicketingMessagesModule,
  ],
  declarations: [],
  exports: [],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
