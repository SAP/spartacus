/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  inject,
} from '@angular/core';
import { Card, CardComponent, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, map } from 'rxjs';

import {
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-opf-gift-card-payment-method-detail',
  templateUrl: './opf-gift-card-payment-method-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CardComponent, AsyncPipe, TranslatePipe],
})
export class OpfGiftCardPaymentMethodDetailComponent
  implements OnInit, OnDestroy
{
  protected translationService = inject(TranslationService);

  protected subscription = new Subscription();
  @Input()
  order: Order;

  protected routingService = inject(RoutingService);
  constructor(@Optional() protected orderOutlet?: OutletContextData<any>) {}

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.subscription?.add(
        this.orderOutlet.context$.subscribe((context) => (this.order = context))
      );
    }
  }

  getPaymentMethodCardContent(): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.paymentOption'),
      this.translationService.translate('giftCard.giftCardPayment'),
    ]).pipe(
      map(([translatedTitle, translatedText]) => {
        return {
          title: translatedTitle,
          text: [translatedText],
        } as Card;
      })
    );
  }

  get isGiftCardPayment(): boolean {
    const totalAppliedAmount =
      this.order?.sapGiftCardSummary?.totalAppliedAmount?.value ?? 0;
    return totalAppliedAmount > 0;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
