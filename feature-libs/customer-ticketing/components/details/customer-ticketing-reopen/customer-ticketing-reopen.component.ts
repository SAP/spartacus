/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerTicketingReopenComponentService } from './customer-ticketing-reopen-component.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-customer-ticketing-reopen',
    templateUrl: './customer-ticketing-reopen.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class CustomerTicketingReopenComponent implements OnDestroy {
  protected subscription = new Subscription();
  protected CustomerTicketingReopenComponentService = inject(
    CustomerTicketingReopenComponentService
  );

  @ViewChild('element') element: ElementRef;

  enableReopenButton$: Observable<boolean | undefined> =
    this.CustomerTicketingReopenComponentService.enableReopenButton();

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
