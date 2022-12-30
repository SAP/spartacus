/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { getLastValueSync, isNotUndefined } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './checkout-payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentTypeComponent {
  @ViewChild('poNumber', { static: false })
  private poNumberInputElement: ElementRef<HTMLInputElement>;

  protected busy$ = new BehaviorSubject<boolean>(false);

  typeSelected?: string;

  isUpdating$ = combineLatest([
    this.busy$,
    this.checkoutPaymentTypeFacade
      .getSelectedPaymentTypeState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(([busy, loading]) => busy || loading),
    distinctUntilChanged()
  );

  paymentTypes$: Observable<PaymentType[]> =
    this.checkoutPaymentTypeFacade.getPaymentTypes();

  typeSelected$: Observable<PaymentType> = combineLatest([
    this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
    ),
    this.paymentTypes$,
  ]).pipe(
    map(
      ([selectedPaymentType, availablePaymentTypes]: [
        PaymentType | undefined,
        PaymentType[]
      ]) => {
        if (
          selectedPaymentType &&
          availablePaymentTypes.find((availablePaymentType) => {
            return availablePaymentType.code === selectedPaymentType.code;
          })
        ) {
          return selectedPaymentType;
        }
        if (availablePaymentTypes.length) {
          this.busy$.next(true);
          this.checkoutPaymentTypeFacade
            .setPaymentType(
              availablePaymentTypes[0].code as string,
              this.poNumberInputElement?.nativeElement?.value
            )
            .subscribe({
              complete: () => this.onSuccess(),
              error: () => this.onError(),
            });
          return availablePaymentTypes[0];
        }
        return undefined;
      }
    ),
    filter(isNotUndefined),
    distinctUntilChanged(),
    tap((selected) => {
      this.typeSelected = selected?.code;
      this.checkoutStepService.resetSteps();
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.PAYMENT_DETAILS,
        selected?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      );
    })
  );

  cartPoNumber$: Observable<string> = this.checkoutPaymentTypeFacade
    .getPurchaseOrderNumberState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      filter(isNotUndefined),
      distinctUntilChanged()
    );

  constructor(
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeType(code: string): void {
    this.busy$.next(true);
    this.typeSelected = code;

    this.checkoutPaymentTypeFacade
      .setPaymentType(code, this.poNumberInputElement.nativeElement.value)
      .subscribe({
        complete: () => this.onSuccess(),
        error: () => this.onError(),
      });
  }

  next(): void {
    if (!this.typeSelected) {
      return;
    }

    const poNumberInput = this.poNumberInputElement.nativeElement.value;
    // if the PO number didn't change
    if (poNumberInput === getLastValueSync(this.cartPoNumber$)) {
      this.checkoutStepService.next(this.activatedRoute);
      return;
    }

    this.busy$.next(true);
    this.checkoutPaymentTypeFacade
      .setPaymentType(this.typeSelected, poNumberInput)
      .subscribe({
        // we don't call onSuccess here, because it can cause a spinner flickering
        complete: () => this.checkoutStepService.next(this.activatedRoute),
        error: () => this.onError(),
      });
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  protected onSuccess(): void {
    this.busy$.next(false);
  }

  protected onError(): void {
    this.busy$.next(false);
  }
}
