import { Component } from '@angular/core';
import { MessageDetails, MessagingConfigs } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CustomerTicketingService } from '../customer-ticketing.service';

@Component({
  selector: 'cx-customer-ticketing-messages',
  templateUrl: './customer-ticketing-messages.component.html',
})
export class CustomerTicketingMessagesComponent {
  constructor(protected customerTicketingService: CustomerTicketingService) {}

  ticketDetails$ = of({
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
      id: 'OPEN',
      name: 'Open',
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
        ],
      },
      {
        author: 'Admin',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T20:25:02+0000',
        message: 'This is the way',
      },
      {
        author: 'Admin',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
    ],
  });

  messageDetails$: Observable<MessageDetails> =
    this.customerTicketingService.prepareMessageDetails();

  messagingConfigs: MessagingConfigs =
    this.customerTicketingService.prepareMessagingConfigs();

  onSend(_event: { files: FileList | undefined; message: string }) {
    // call to submit new event and upload attachment
  }
}
