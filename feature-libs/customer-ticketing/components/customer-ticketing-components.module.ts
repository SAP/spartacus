import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketCloseModule } from './customer-ticket-close';
import { CustomerTicketDetailsModule } from './customer-ticket-details';
import {
  CustomerTicketReopenModule,
  defaultCustomerTicketingFormLayoutConfig,
} from './customer-ticket-reopen';
import { CustomerTicketMessagesModule } from './customer-ticket-messages';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    CustomerTicketDetailsModule,
    CustomerTicketCloseModule,
    CustomerTicketReopenModule,
    CustomerTicketMessagesModule,
  ],
  declarations: [],
  exports: [],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
