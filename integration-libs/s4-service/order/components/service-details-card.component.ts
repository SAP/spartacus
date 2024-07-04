/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit, Optional, inject} from "@angular/core";
import { TranslationService } from "@spartacus/core";
import { Order } from "@spartacus/order/root";
import { Card, OutletContextData } from "@spartacus/storefront";
import { Observable, Subscription, combineLatest, map } from "rxjs";

@Component({
    selector: 'cx-service-order-confirmation-shipping',
    templateUrl: './service-details-card.component.html',
})
export class ServiceDetailsCardComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
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

    getServiceDetailsCard(servicedAt: string | undefined): Observable<Card> {
        if(servicedAt && servicedAt!==undefined){
            return combineLatest([
                this.translationService.translate('serviceOrderCheckout.serviceDetails'),
                this.translationService.translate('serviceOrderCheckout.cardLabel'),
              ]).pipe(
                map(([textTitle, textLabel]) => {
                  servicedAt =
                    this.convertDateTimeToReadableString(
                      servicedAt ?? ''
                    );
                  return {
                    title: textTitle,
                    textBold: textLabel,
                    text: [servicedAt],
                  };
                })
              );
        }
        else{
            return combineLatest([
                this.translationService.translate('serviceOrderCheckout.serviceDetails'),
                this.translationService.translate(
                  'serviceOrderCheckout.emptyServiceDetailsCard'
                ),
              ]).pipe(
                map(([textTitle, text]) => {
                  return {
                    title: textTitle,
                    text: [text],
                  };
                })
              );
        }

      }
// duplicated code from CheckoutServiceSchedulePickerService
      convertDateTimeToReadableString(dateTime: string): string {
        const date = new Date(dateTime);
        return date.toLocaleString();
      }
      ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }
}
