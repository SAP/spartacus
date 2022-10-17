import {
  AssociatedObject,
  Category,
  Ticket,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

export abstract class CustomerTicketingAdapter {
  abstract getTicket(
    customerId: string,
    ticketId: string
  ): Observable<TicketDetails>;

  abstract getTicketCategories(): Observable<Category[]>;

  abstract getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObject[]>;

  abstract createTicket(customerId: string, ticket: Ticket): Observable<Ticket>;
}
