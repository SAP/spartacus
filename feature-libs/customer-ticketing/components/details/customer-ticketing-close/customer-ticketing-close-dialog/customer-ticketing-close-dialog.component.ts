/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  STATUS,
  STATUS_NAME,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
import { FocusDirective } from '../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { FormRequiredAsterisksComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-customer-ticketing-close-dialog',
  templateUrl: './customer-ticketing-close-dialog.component.html',
  imports: [
    FocusDirective,
    FormsModule,
    ReactiveFormsModule,
    IconComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    NgIf,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class CustomerTicketingCloseDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription;

  ngOnInit(): void {
    this.buildForm();
  }

  closeRequest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.isDataLoading$.next(true);
      this.subscription = this.customerTicketingFacade
        .createTicketEvent(this.prepareTicketEvent())
        .subscribe({
          complete: () => {
            this.onComplete();
          },
          error: () => {
            this.onError();
          },
        });
    }
  }

  protected prepareTicketEvent(): TicketEvent {
    return {
      message: this.form?.get('message')?.value,
      toStatus: {
        id: STATUS.CLOSED,
        name: STATUS_NAME.CLOSED,
      },
    };
  }

  protected onComplete(): void {
    this.isDataLoading$.next(false);
    this.close('Ticket closed successfully');
    this.routingService.go({ cxRoute: 'supportTickets' });
  }

  protected onError(): void {
    this.close('Something went wrong while closing the ticket');
    this.isDataLoading$.next(false);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
