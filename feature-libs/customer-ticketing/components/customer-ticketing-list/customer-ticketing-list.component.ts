import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-list',
  templateUrl: './customer-ticketing-list.component.html',
})
export class CustomerTicketingListComponent {
  constructor() {}

  tickets$ = of({
    pagination: {
      currentPage: 0,
      pageSize: 0,
      sort: 'string',
      totalPages: 0,
      totalResults: 0,
    },
    sorts: [
      {
        code: 'string',
        name: 'string',
        selected: true,
      },
    ],
    tickets: [
      {
        associatedTo: {
          code: '00001000',
          modifiedAt: '2021-01-13T10:06:57+0000',
          type: 'Cart',
        },
        availableStatusTransitions: [
          {
            id: 'CLOSED',
            name: 'Closed',
          },
        ],
        createdAt: '2021-01-13T10:06:57+0000',
        customerId: 1000001,
        id: '0000001',
        modifiedAt: '2021-01-13T10:06:57+0000',
        status: {
          id: 'CLOSED',
          name: 'Closed',
        },
        subject: 'My drill is broken.',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
        ticketEvents: [
          {
            addedByAgent: false,
            author: 'Mark Rivers',
            createdAt: '2021-01-13T10:06:57+0000',
            message:
              'It is broken when I receive it. Please send one replacement to me.',
            toStatus: {
              id: 'CLOSED',
              name: 'Closed',
            },
          },
        ],
      },
    ],
  });

  tickets = this.tickets$.pipe(
    map((tickets) => {
      return tickets.tickets.map((ticket) => {
        return {
          id: ticket.id,
          subject: ticket.subject,
          ticketCategory: ticket.ticketCategory.name,
          status: ticket.status.name,
          createdAt: ticket.createdAt,
          modifiedAt: ticket.modifiedAt,
        };
      });
    })
  );
}
