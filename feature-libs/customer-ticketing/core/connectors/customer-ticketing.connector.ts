import { Injectable } from '@angular/core';
import {
  AssociatedObjects,
  Category,
  TicketDetails,
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
  ): Observable<AssociatedObjects[]> {
    return this.adapter.getTicketAssociatedObjects(customerId);
  }
}
