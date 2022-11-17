import { NgModule } from '@angular/core';
import { CustomerTicketingEventListener } from './customer-ticketing-event.listener';

@NgModule({})
export class CustomerTicketingEventModule {
  constructor(
    _customerTicketingEventListener: CustomerTicketingEventListener
  ) {}
}
