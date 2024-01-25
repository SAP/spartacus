/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

export abstract class CustomerTicketingAdapter {
  abstract getTicket(
    customerId: string,
    ticketId: string
  ): Observable<TicketDetails>;

  abstract getTickets(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<TicketList>;

  abstract getTicketCategories(): Observable<Category[]>;

  abstract getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObject[]>;

  abstract createTicket(
    customerId: string,
    ticket: TicketStarter
  ): Observable<TicketStarter>;

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

  abstract downloadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    attachmentId: string
  ): Observable<unknown>;
}
