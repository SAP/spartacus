/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutSupportedDeliveryModesQueryReloadEvent } from '@spartacus/checkout/base/root';
import {
  CxDatePipe,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  TranslationService,
} from '@spartacus/core';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestedDeliveryDateFacade } from '../../facade/requested-delivery-date.facade';

@Component({
  selector: 'cx-request-delivery-date',
  templateUrl: './delivery-mode-date-picker.component.html',
  providers: [CxDatePipe],
})
export class DeliveryModeDatePickerComponent implements OnInit, OnDestroy {
  constructor(
    protected datePipe: CxDatePipe,
    protected requestedDelDateFacade: RequestedDeliveryDateFacade,
    protected eventService: EventService,
    protected translation: TranslationService,
    protected globalMessageService: GlobalMessageService,
    @Optional() protected deliveryOutlet?: OutletContextData
  ) {}

  protected cartEntry: Cart = {};
  protected subscription = new Subscription();

  protected earliestRetrievalAt: string | undefined;
  protected requestedRetrievalAt: string | undefined;
  protected form: FormGroup = new FormGroup({
    requestDeliveryDate: new FormControl(),
  });
  protected isDatePickerReadOnly: boolean = true;

  ngOnInit(): void {
    if (this.deliveryOutlet?.context$) {
      this.subscription.add(
        this.deliveryOutlet.context$.subscribe((context) => {
          this.cartEntry = context?.item;
          this.isDatePickerReadOnly = context?.readonly || false;
        })
      );
    }

    if (this.isEarliestRetrievalDatePresent()) {
      this.earliestRetrievalAt = this.cartEntry.earliestRetrievalAt;
    }
    if (this.isRequestedDeliveryDatePresent()) {
      this.requestedRetrievalAt = this.cartEntry.requestedRetrievalAt;
    } else {
      //set the value of requestedRetrievalAt as earliestRetrievalAt and update occ.
      this.requestedRetrievalAt = this.earliestRetrievalAt;
      this.setRequestedDeliveryDate();
    }
    this.form.patchValue({
      requestDeliveryDate: this.requestedRetrievalAt,
    });
  }

  isEarliestRetrievalDatePresent(): boolean {
    return (
      this.cartEntry?.earliestRetrievalAt != null &&
      this.cartEntry?.earliestRetrievalAt !== undefined &&
      typeof this.cartEntry?.earliestRetrievalAt === 'string'
    );
  }

  isRequestedDeliveryDatePresent(): boolean {
    return (
      this.cartEntry?.requestedRetrievalAt != null &&
      this.cartEntry?.requestedRetrievalAt !== undefined &&
      typeof this.cartEntry?.requestedRetrievalAt === 'string'
    );
  }

  getRequestedDeliveryDateCardContent(
    isoDate: string | null
  ): Observable<Card> {
    return this.translation
      .translate('requestedDeliveryDate.readOnlyTextLabel')
      .pipe(
        filter(() => Boolean(isoDate)),
        map((textTitle) => {
          return {
            text: [textTitle, isoDate],
          } as Card;
        })
      );
  }

  setRequestedDeliveryDate() {
    const userId = this.cartEntry?.user?.uid || '';
    const cartId = this.cartEntry?.code || '';
    const requestedDate =
      this.form?.get('requestDeliveryDate')?.value ||
      this.requestedRetrievalAt ||
      '';

    if (
      userId.length === 0 ||
      cartId.length === 0 ||
      requestedDate.length === 0
    ) {
      return;
    }
    this.subscription.add(
      this.requestedDelDateFacade
        .setRequestedDeliveryDate(userId, cartId, requestedDate)
        .subscribe(() => {
          this.eventService.dispatch(
            {},
            CheckoutSupportedDeliveryModesQueryReloadEvent
          );
          this.globalMessageService.add(
            { key: 'requestedDeliveryDate.successMessage' },
            GlobalMessageType.MSG_TYPE_INFO
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
