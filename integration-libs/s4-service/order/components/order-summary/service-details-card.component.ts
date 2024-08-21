/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import {
  ServiceDateTime,
  CheckoutServiceSchedulePickerService,
} from '@spartacus/s4-service/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'cx-card-service-details',
  templateUrl: './service-details-card.component.html',
})
export class ServiceDetailsCardComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  @Optional() protected orderOutlet = inject(OutletContextData);
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

  getServiceDetailsCard(
    scheduledAt: ServiceDateTime | undefined
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate('serviceOrderCheckout.serviceDetails'),
      this.translationService.translate(
        'serviceOrderCheckout.emptyServiceDetailsCard'
      ),
    ]).pipe(
      map(([textTitle, emptyTextLabel]) => {
        if (scheduledAt) {
          scheduledAt =
            this.checkoutServiceSchedulePickerService.convertDateTimeToReadableString(
              scheduledAt
            );
        }
        return {
          title: textTitle,
          textBold: scheduledAt ? scheduledAt.split(',')[0] : emptyTextLabel,
          text: scheduledAt ? [scheduledAt.split(',')[1].trim()] : undefined,
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
