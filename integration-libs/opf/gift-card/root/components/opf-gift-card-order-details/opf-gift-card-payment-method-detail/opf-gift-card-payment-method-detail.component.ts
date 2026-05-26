/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  Optional,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card, CardComponent, OutletContextData } from '@spartacus/storefront';
import { Observable, combineLatest, map } from 'rxjs';

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
export class OpfGiftCardPaymentMethodDetailComponent implements OnInit {
  protected translationService = inject(TranslationService);
  protected destroyRef = inject(DestroyRef);

  @Input()
  order: Order;

  protected routingService = inject(RoutingService);
  constructor(@Optional() protected orderOutlet?: OutletContextData) {}

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.orderOutlet.context$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((context) => (this.order = context));
    }
  }

  getPaymentMethodCardContent(): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.paymentOption'),
      this.translationService.translate('opfGiftCard.giftCardPayment'),
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
      this.order?.opfGiftCardSummary?.totalAppliedAmount?.value ?? 0;
    return totalAppliedAmount > 0;
  }
  //if sapPaymentMethod is present, it means that gift card doesn't cover full amount,
  get isPaymentMethodDetailsInfoPresent(): boolean {
    return Boolean(this.order?.paymentInfo?.sapPaymentMethod?.name);
  }
}
