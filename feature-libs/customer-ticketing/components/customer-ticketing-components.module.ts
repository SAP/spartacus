import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
  ],
  exports: [],
  providers: [],
})
export class CustomerTicketingComponentsModule {}
