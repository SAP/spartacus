import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketCloseModule } from './customer-ticket-close';
import { CustomerTicketDetailsModule } from './customer-ticket-details';
import { CustomerTicketReopenModule } from './customer-ticket-reopen';
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
  providers: [],
})
export class CustomerTicketingComponentsModule {}
