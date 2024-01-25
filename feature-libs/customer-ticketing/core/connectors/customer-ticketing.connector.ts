/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
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

  public createTicket(
    customerId: string,
    ticket: TicketStarter
  ): Observable<TicketStarter> {
    return this.adapter.createTicket(customerId, ticket);
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

  public downloadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    attachmentId: string
  ): Observable<unknown> {
    return this.adapter.downloadAttachment(
      customerId,
      ticketId,
      eventCode,
      attachmentId
    );
  }
}
