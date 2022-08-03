import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './customer-ticketing-close';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import {
  CustomerTicketingReopenModule,
  defaultCustomerTicketingFormLayoutConfig,
} from './customer-ticketing-reopen';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingCloseModule,
    CustomerTicketingReopenModule,
  ],
  declarations: [],
  exports: [],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
