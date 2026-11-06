/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CxDatePipe, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { SpinnerComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-my-account-v2-customer-ticketing',
  templateUrl: './my-account-v2-customer-ticketing.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    CxDatePipe,
    UrlPipe,
  ],
})
export class MyAccountV2CustomerTicketingComponent {
  protected readonly PAGE_SIZE = 1;
  protected customerTicketingFacade = inject(CustomerTicketingFacade);
  tickets$: Observable<TicketList | undefined> =
    this.customerTicketingFacade.getTickets(this.PAGE_SIZE);
}
