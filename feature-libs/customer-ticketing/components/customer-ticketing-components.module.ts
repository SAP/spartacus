import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import { CustomerTicketingListModule } from './customer-ticketing-list';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingListModule,
  ],
  exports: [],
  providers: [],
})
export class CustomerTicketingComponentsModule {}
