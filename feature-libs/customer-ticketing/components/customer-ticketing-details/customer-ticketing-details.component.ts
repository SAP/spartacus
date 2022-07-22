import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {
  COLOR_CLOSE,
  COLOR_OPEN,
  STATUS_CLOSE,
  STATUS_OPEN,
} from '@spartacus/customer-ticketing/root';
import { Card } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-details',
  templateUrl: './customer-ticketing-details.component.html',
})
export class CustomerTicketingDetailsComponent implements OnInit {
  constructor(protected translation: TranslationService) {}

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
      },
      {
        author: 'Mark Rivers',
        createdAt: '2022-06-22T14:37:15+0000',
        message: 'A message to consider',
      },
    ],
  });

  ngOnInit(): void {}

  prepareCardContent(
    entity: string,
    titleTranslation: string
  ): Observable<Card> {
    return this.translation.translate(titleTranslation).pipe(
      filter(() => Boolean(entity)),
      map((textTitle) => ({
        title: textTitle,
        text: [entity],
        customCss: this.getStatusColor(entity),
      }))
    );
  }

  getStatusColor(status: string): { color: string } | null {
    return status === STATUS_OPEN
      ? { color: COLOR_OPEN }
      : status === STATUS_CLOSE
      ? { color: COLOR_CLOSE }
      : null;
  }
}
