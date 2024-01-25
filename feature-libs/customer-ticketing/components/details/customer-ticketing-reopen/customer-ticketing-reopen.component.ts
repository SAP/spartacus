/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  CustomerTicketingFacade,
  STATUS,
} from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-ticketing-reopen',
  templateUrl: './customer-ticketing-reopen.component.html',
})
export class CustomerTicketingReopenComponent implements OnDestroy {
  protected subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  enableReopenButton$: Observable<boolean | undefined> =
    this.customerTicketingFacade
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

  constructor(
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN,
      this.element,
      this.vcr
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
