import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingDetailsModule,
  ],
  exports: [],
  providers: [],
})
export class CustomerTicketingListComponentsModule {}
