import { Injectable } from '@angular/core';
import { TicketDetails, TicketList } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { CustomerTicketingAdapter } from './customer-ticketing.adapter';

@Injectable()
export class CustomerTicketingConnector {
  constructor(protected adapter: CustomerTicketingAdapter) {}

  public getTicket(
    customerId: string,
    ticketId: string
  ): Observable<TicketDetails> {
    return this.adapter.getTicket(customerId, ticketId);
  }

  public getTickets(customerId: string): Observable<TicketList> {
    return this.adapter.getTickets(customerId);
  }
}
