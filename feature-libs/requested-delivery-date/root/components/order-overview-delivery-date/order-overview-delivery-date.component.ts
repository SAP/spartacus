/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, CardComponent, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DateValidationService } from '../shared/date-validation.service';

@Component({
  selector: 'cx-order-overview-delivery-date',
  templateUrl: './order-overview-delivery-date.component.html',
  imports: [CardComponent, AsyncPipe, CxDatePipe],
})
export class OrderOverviewDeliveryDateComponent implements OnInit, OnDestroy {
  protected dateValidationService = inject(DateValidationService);
  protected translation = inject(TranslationService);
  protected orderOutlet? = inject(OutletContextData, { optional: true });

  protected subscription = new Subscription();
  order: Order;

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.subscription.add(
        this.orderOutlet.context$.subscribe(
          (context) => (this.order = context?.item)
        )
      );
    }
  }

  isRequestedDeliveryDatePresent(): boolean {
    return this.dateValidationService.isDateStringValid(
      this.order?.requestedRetrievalAt
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
            title: textTitle,
            text: [isoDate],
          } as Card;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
