/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Address, PaymentDetails, TranslatePipe } from '@spartacus/core';
import {
  Card,
  CardComponent,
  ICON_TYPE,
  IconComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';

@Component({
  selector: 'cx-opf-tokenisation-payment-method',
  templateUrl: './opf-tokenisation-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    SlicePipe,
    CardComponent,
    IconComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
  providers: [OpfTokenisationPaymentMethodService],
})
export class OpfTokenisationPaymentMethodComponent
  implements OnInit, OnDestroy
{
  protected OpfTokenisationPaymentMethodService = inject(
    OpfTokenisationPaymentMethodService
  );
  protected cdr = inject(ChangeDetectorRef);

  cards$: Observable<{ content: Card; paymentMethod: PaymentDetails }[]>;
  isUpdating$: Observable<boolean>;
  selectedMethod$: Observable<PaymentDetails | undefined>;
  showSavedCards$: Observable<boolean>;
  iconTypes = ICON_TYPE;
  showAll = false;
  readonly VISIBLE_CARDS_COUNT = 2;

  ngOnInit(): void {
    this.OpfTokenisationPaymentMethodService.initialize();
    this.cards$ = this.OpfTokenisationPaymentMethodService.getCards$();
    this.isUpdating$ = this.OpfTokenisationPaymentMethodService.isUpdating$;
    this.selectedMethod$ =
      this.OpfTokenisationPaymentMethodService.selectedMethod$;
    this.showSavedCards$ =
      this.OpfTokenisationPaymentMethodService.showSavedCards$;

    // Auto-expand "show all" if the restored/selected card is beyond the initially
    // visible limit (e.g. when navigating back with a 3rd-or-later card selected).
    combineLatest([this.cards$, this.selectedMethod$])
      .pipe(
        filter(
          ([cards, selected]) =>
            cards.length > this.VISIBLE_CARDS_COUNT && !!selected?.id
        ),
        take(1)
      )
      .subscribe(([cards, selected]) => {
        const selectedIndex = cards.findIndex(
          (c) => c.paymentMethod.id === selected?.id
        );
        if (selectedIndex >= this.VISIBLE_CARDS_COUNT) {
          this.showAll = true;
          this.cdr.markForCheck();
        }
      });
  }

  selectPaymentMethod(paymentDetails: PaymentDetails): void {
    this.OpfTokenisationPaymentMethodService.selectPaymentMethod(
      paymentDetails
    );
  }

  onCardClick(event: MouseEvent, paymentDetails: PaymentDetails): void {
    if (this.isCardExpired(paymentDetails)) {
      return;
    }

    const target = event.target as HTMLElement | null;

    if (target?.closest('button, a, cx-generic-link')) {
      return;
    }

    this.selectPaymentMethod(paymentDetails);
  }

  setDefaultPaymentMethod(paymentDetails: PaymentDetails): void {
    this.OpfTokenisationPaymentMethodService.setDefaultPaymentMethod(
      paymentDetails
    );
  }

  isCardExpired(paymentDetails: PaymentDetails): boolean {
    return this.OpfTokenisationPaymentMethodService.isCardExpired(
      paymentDetails
    );
  }

  setPaymentDetails({
    paymentDetails,
    billingAddress,
  }: {
    paymentDetails: PaymentDetails;
    billingAddress?: Address;
  }): void {
    this.OpfTokenisationPaymentMethodService.setPaymentDetails({
      paymentDetails,
      billingAddress,
    });
  }

  next(): void {
    this.OpfTokenisationPaymentMethodService.next();
  }

  back(): void {
    this.OpfTokenisationPaymentMethodService.back();
  }

  ngOnDestroy(): void {
    this.OpfTokenisationPaymentMethodService.destroy();
  }
}
