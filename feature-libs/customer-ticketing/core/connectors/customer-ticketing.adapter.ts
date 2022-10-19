import { TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

export abstract class CustomerTicketingAdapter {
  abstract getTicket(
    customerId: string,
    ticketId: string
  ): Observable<TicketDetails>;

  abstract createTicketEvent(
    customerId: string,
    ticketId: string,
    ticketEvent: TicketEvent
  ): Observable<TicketEvent>;

  abstract uploadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    file: File
  ): Observable<unknown>;
}
