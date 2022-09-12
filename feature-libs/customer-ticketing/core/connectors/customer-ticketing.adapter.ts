import {
  AssociatedObjects,
  Category,
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
  ): Observable<AssociatedObjects[]>;
}
