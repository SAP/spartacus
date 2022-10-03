import { Component, OnInit } from '@angular/core';
import { of, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '@spartacus/storefront';
import { TranslationService } from '@spartacus/core';
import { STATUS, TEXT_COLOR_CLASS } from '@spartacus/customer-ticketing/root';

@Component({
  selector: 'cx-customer-ticketing-list',
  templateUrl: './customer-ticketing-list.component.html',
})
export class CustomerTicketingListComponent implements OnInit {
  constructor(protected translation: TranslationService) {}
  sortType: string = 'byId';
  iconTypes = ICON_TYPE;
  customerTicketsFlag: boolean = true;

  tickets$ = of({
    pagination: {
      currentPage: 0,
      pageSize: 5,
      sort: 'byId',
      totalPages: 2,
      totalResults: 10,
    },
    sorts: [
      { code: 'byId', selected: true },
      { code: 'byChangedDate', selected: false },
    ],
    tickets: [
      {
        availableStatusTransitions: [
          {
            id: 'CLOSED',
            name: 'Closed',
          },
        ],
        id: '0000001',
        createdAt: '2021-01-13T10:06:57+0000',
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
      {
        availableStatusTransitions: [
          {
            id: 'CLOSED',
            name: 'Closed',
          },
        ],
        id: '0000002',
        createdAt: '2021-01-14T10:06:57+0000',
        modifiedAt: '2021-01-14T10:06:57+0000',
        status: {
          id: 'OPEN',
          name: 'Open',
        },
        subject: 'Need fix for my door',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Enquiry',
        },
        ticketEvents: [
          {
            author: 'Bob',
            createdAt: '2021-01-14T10:06:57+0000',
            message: 'Door received broken',
            toStatus: {
              id: 'OPEN',
              name: 'Open',
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
          status: ticket.status,
          createdAt: ticket.createdAt,
          modifiedAt: ticket.modifiedAt,
        };
      });
    })
  );

  ngOnInit(): void {
    this.tickets$.subscribe((tickets) => {
      this.customerTicketsFlag = tickets && tickets.tickets?.length > 0;
    });
  }

  getSortLabels(): Observable<{ byId: string; byChangedDate: string }> {
    return combineLatest([
      this.translation.translate('customerTicketing.ticketId'),
      this.translation.translate('customerTicketing.changedOn'),
    ]).pipe(
      map(([textById, textByChangedDate]) => {
        return {
          byId: textById,
          byChangedDate: textByChangedDate,
        };
      })
    );
  }

  changeSortCode(sortCode: string): void {
    // const event: { sortCode: string; currentPage: number } = {
    //   sortCode,
    //   currentPage: 0,
    // };
    this.sortType = sortCode;
    // this.fetchTicketList(event);
  }

  pageChange(page: number): void {
    // const event: { sortCode: string; currentPage: number } = {
    //   sortCode: this.sortType,
    //   currentPage: page,
    // };
    console.log('pageChange', page);
    // this.fetchTicketList(event);
  }

  getStatusClass = (status: string): string => {
    switch (status) {
      case STATUS.OPEN:
      case STATUS.INPROCESS:
        return TEXT_COLOR_CLASS.GREEN;
      case STATUS.CLOSED:
        return TEXT_COLOR_CLASS.GREY;
      default:
        return '';
    }
  };
}
