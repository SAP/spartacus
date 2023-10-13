/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
  CustomerTicketingFacade,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-myaccount-v2-customer-ticketing',
  templateUrl: './myaccount-v2-customer-ticketing.component.html',
})
export class MyAccountV2CustomerTicketingComponent {
  protected PAGE_SIZE = 1;
  protected customerTicketingFacade = inject(CustomerTicketingFacade);
  tickets$: Observable<TicketList | undefined> =
    this.customerTicketingFacade.getTickets(this.PAGE_SIZE);
}
