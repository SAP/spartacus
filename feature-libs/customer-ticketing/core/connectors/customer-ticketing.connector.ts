import { Injectable } from '@angular/core';
import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
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

  public getTickets(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<TicketList> {
    return this.adapter.getTickets(customerId, pageSize, currentPage, sort);
  }

  public getTicketCategories(): Observable<Category[]> {
    return this.adapter.getTicketCategories();
  }

  public getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObject[]> {
    return this.adapter.getTicketAssociatedObjects(customerId);
  }

  public createTicketEvent(
    customerId: string,
    ticketId: string,
    ticketEvent: TicketEvent
  ): Observable<TicketEvent> {
    return this.adapter.createTicketEvent(customerId, ticketId, ticketEvent);
  }
}
