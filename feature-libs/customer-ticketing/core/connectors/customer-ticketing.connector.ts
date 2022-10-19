import { Injectable } from '@angular/core';
import { TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';
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

  public createTicketEvent(
    customerId: string,
    ticketId: string,
    ticketEvent: TicketEvent
  ): Observable<TicketEvent> {
    return this.adapter.createTicketEvent(customerId, ticketId, ticketEvent);
  }

  public uploadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    file: File
  ): Observable<unknown> {
    return this.adapter.uploadAttachment(customerId, ticketId, eventCode, file);
  }
}
