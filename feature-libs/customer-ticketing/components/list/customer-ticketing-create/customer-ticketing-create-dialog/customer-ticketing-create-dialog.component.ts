/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AssociatedObject,
  Category,
  MAX_ENTRIES_FOR_ATTACHMENT,
  TicketDetails,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { FormUtils } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
@Component({
  selector: 'cx-customer-ticketing-create-dialog',
  templateUrl: './customer-ticketing-create-dialog.component.html',
})
export class CustomerTicketingCreateDialogComponent
  extends CustomerTicketingDialogComponent
  implements OnInit, OnDestroy
{
  ticketCategories$: Observable<Category[]> =
    this.customerTicketingFacade.getTicketCategories();
  ticketAssociatedObjects$: Observable<AssociatedObject[]> =
    this.customerTicketingFacade.getTicketAssociatedObjects();
  subscription: Subscription;

  @Input()
  selectedCategory: Category;

  @Input()
  selectedAssociatedObject: AssociatedObject;

  attachment: File;

  protected getCreateTicketPayload(form: FormGroup): TicketStarter {
    return {
      message: form?.get('message')?.value,
      subject: form?.get('subject')?.value,
      associatedTo: form?.get('associatedTo')?.value || undefined,
      ticketCategory: form?.get('ticketCategory')?.value,
    };
  }

  ngOnInit(): void {
    this.buildForm();
  }

  protected buildForm(): void {
    const form = new FormGroup({});
    form.setControl(
      'subject',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.inputCharactersForSubject),
      ])
    );
    form.setControl(
      'ticketCategory',
      new FormControl('', [Validators.required])
    );
    form.setControl('associatedTo', new FormControl(''));
    form.setControl(
      'message',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.inputCharactersLimit),
      ])
    );
    form.setControl(
      'file',
      new FormControl('', [
        this.filesFormValidators.maxSize(this.maxSize),
        this.filesFormValidators.maxEntries(MAX_ENTRIES_FOR_ATTACHMENT),
        this.filesFormValidators.allowedTypes(this.allowedTypes),
      ])
    );
    this.form = form;
  }

  createTicketRequest(): void {
    this.attachment = this.form.get('file')?.value?.[0];
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(this.form);
    } else {
      this.subscription = this.customerTicketingFacade
        .createTicket(this.getCreateTicketPayload(this.form))
        .subscribe({
          next: (response: TicketDetails) => {
            if (
              response.id &&
              this.attachment &&
              response.ticketEvents?.[0].code
            ) {
              this.customerTicketingFacade.uploadAttachment(
                this.attachment,
                response.ticketEvents?.[0].code,
                response.id
              );
            }
          },
          complete: () => {
            this.onComplete();
          },
          error: () => {
            this.onError();
          },
        });
    }
  }

  protected onComplete(): void {
    this.close('Ticket created successfully');
  }

  protected onError(): void {
    this.close('Something went wrong');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
