import { Injectable } from '@angular/core';
import { MessageEvent, MessagingConfigs } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingConfig, TicketDetails } from '../root';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingService {
  constructor(protected customerTicketingConfig: CustomerTicketingConfig) {}

  ticketDetails$: Observable<TicketDetails> = of({
    associatedTo: {
      code: '00000001',
      modifiedAt: '2022-06-28T00:00:00+0000',
      type: 'Cart',
    },
    availableStatusTransitions: [
      {
        id: 'CLOSED',
        name: 'Closed',
      },
    ],
    createdAt: '2022-06-22T14:37:15+0000',
    id: '00000001',
    modifiedAt: '2022-06-22T20:25:02+0000',
    status: {
      id: 'CLOSE',
      name: 'Close',
    },
    subject: 'test ticket again',
    ticketCategory: {
      id: 'COMPLAINT',
      name: 'Complaint',
    },
    ticketEvents: [
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
        attachments: [
          {
            filename: 'screenshot.png',
            URL: 'https://ccv2.domain.com/occ/v2/electronics/users/0001/tickets/0013/events/0007PC/attachments/0034-034-24589',
          },
          {
            filename: 'screenshot.png',
            URL: 'https://ccv2.domain.com/occ/v2/electronics/users/0001/tickets/0013/events/0007PC/attachments/0034-034-24589',
          },
        ],
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
      {
        addedByAgent: true,
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
      },
      {
        addedByAgent: true,
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
    ],
  });

  getTicketSubject(): Observable<string | undefined> {
    return this.ticketDetails$.pipe(map((details) => details.subject));
  }

  getTicketStatus(): Observable<string | undefined> {
    return this.ticketDetails$.pipe(map((details) => details?.status?.id));
  }

  prepareMessageEvents(): Observable<Array<MessageEvent> | undefined> {
    return this.ticketDetails$.pipe(
      map((ticket) =>
        ticket.ticketEvents?.map(
          (event): MessageEvent => ({
            ...event,
            text: event.message,
            rightAlign: event.addedByAgent,
          })
        )
      )
    );
  }

  prepareMessagingConfigs = (): MessagingConfigs => ({
    attachmentRestrictions:
      this.customerTicketingConfig.customerTicketing?.attachmentRestrictions,
    charactersLimit:
      this.customerTicketingConfig.customerTicketing?.inputCharactersLimit,
    uploadFile: true,
  });
}
