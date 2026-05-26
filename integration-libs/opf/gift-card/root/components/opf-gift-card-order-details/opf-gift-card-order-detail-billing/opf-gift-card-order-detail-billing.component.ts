/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card, CardComponent, OutletContextData } from '@spartacus/storefront';

import {
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'cx-opf-gift-card-order-detail-billing',
  templateUrl: './opf-gift-card-order-detail-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CardComponent, AsyncPipe, CommonModule, TranslatePipe],
  standalone: true,
})
export class OpfGiftCardOrderDetailBillingComponent implements OnInit {
  protected translationService = inject(TranslationService);
  protected destroyRef = inject(DestroyRef);
  @Input()
  order: Order;

  constructor(@Optional() protected orderOutlet?: OutletContextData) {}
  protected routingService = inject(RoutingService);

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.orderOutlet.context$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((context) => (this.order = context));
    }
  }

  isOrderDetailsPage$ = this.routingService
    .getRouterState()
    .pipe(
      map(({ state }) => ['orderDetails'].includes(state?.semanticRoute ?? ''))
    );

  getPaymentMethodCardContent(): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.payment'),
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
}
