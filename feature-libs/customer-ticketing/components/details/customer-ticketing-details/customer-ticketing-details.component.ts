/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {
  STATUS,
  TEXT_COLOR_CLASS,
  TicketDetails,
  DATE_FORMAT,
  CustomerTicketingFacade,
} from '@spartacus/customer-ticketing/root';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-details',
  templateUrl: './customer-ticketing-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTicketingDetailsComponent {
  dateFormat = DATE_FORMAT;
  ticketDetails$: Observable<TicketDetails | undefined> =
    this.customerTicketingFacade.getTicket();

  constructor(
    protected translation: TranslationService,
    protected customerTicketingFacade: CustomerTicketingFacade
  ) {}

  prepareCardContent(
    entity: string,
    titleTranslation: string,
    id?: string
  ): Observable<Card> {
    return this.translation.translate(titleTranslation).pipe(
      filter(() => Boolean(entity)),
      map((textTitle) => ({
        title: textTitle,
        text: [entity],
        customClass: this.getStatusClass(id?.toUpperCase()),
      }))
    );
  }

  getStatusClass(id?: string): string {
    return id === STATUS.OPEN || id === STATUS.INPROCESS
      ? TEXT_COLOR_CLASS.GREEN
      : id === STATUS.CLOSED
      ? TEXT_COLOR_CLASS.GREY
      : '';
  }
}
