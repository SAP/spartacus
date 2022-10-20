import { Injectable } from '@angular/core';
import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
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
  public getTicketCategories(): Observable<Category[]> {
    return this.adapter.getTicketCategories();
  }

  public getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObject[]> {
    return this.adapter.getTicketAssociatedObjects(customerId);
  }

  public createTicket(
    customerId: string,
    ticket: TicketStarter
  ): Observable<TicketStarter> {
    return this.adapter.createTicket(customerId, ticket);
  }
}
