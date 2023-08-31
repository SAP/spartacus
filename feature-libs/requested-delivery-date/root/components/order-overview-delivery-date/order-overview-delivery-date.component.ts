/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DateValidationService } from '../shared/date-validation.service';

@Component({
  selector: 'cx-order-overview-delivery-date',
  templateUrl: './order-overview-delivery-date.component.html',
})
export class OrderOverviewDeliveryDateComponent implements OnInit, OnDestroy {
  constructor(
    protected dateValidationService: DateValidationService,
    protected translation: TranslationService,
    @Optional() protected orderOutlet?: OutletContextData
  ) {}

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
