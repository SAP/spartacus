/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  CustomerTicketingFacade,
  STATUS,
} from '@spartacus/customer-ticketing/root';
import { Observable, map } from 'rxjs';

@Injectable()
export class CustomerTicketingReopenComponentService {
  protected customerTicketingFacade = inject(CustomerTicketingFacade);
  enableReopenButton(): Observable<boolean | undefined> {
    return this.customerTicketingFacade
      .getTicket()
      .pipe(
        map(
          (ticket) =>
            ticket?.status?.id === STATUS.CLOSED &&
            ticket.availableStatusTransitions?.some(
              (status) =>
                status.id.toUpperCase() === STATUS.INPROCESS ||
                status.id.toUpperCase() === STATUS.OPEN
            )
        )
      );
  }
}
