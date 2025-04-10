/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/base/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  getLastValueSync,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  isNotUndefined,
  OccHttpErrorType,
} from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfBaseFacade,
} from '@spartacus/opf/base/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';

import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  take,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'cx-opf-b2b-checkout-payment-type',
  templateUrl: './opf-b2b-checkout-payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutPaymentTypeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected opfBaseService = inject(OpfBaseFacade);
  @ViewChild('poNumber', { static: false })
  protected poNumberInputElement: ElementRef<HTMLInputElement>;

  protected busy$ = new BehaviorSubject<boolean>(false);
  protected opfPaymentFacade = inject(OpfPaymentFacade);

  typeSelected?: string;
  paymentTypesError = false;

  isUpdating$ = combineLatest([
    this.busy$,
    this.checkoutPaymentTypeFacade
      .getSelectedPaymentTypeState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(([busy, loading]) => busy || loading),
    distinctUntilChanged()
  );

  paymentTypes$: Observable<OpfActiveConfiguration[]> =
    this.checkoutPaymentTypeFacade.getPaymentTypes().pipe(
      tap(() => (this.paymentTypesError = false)),
      catchError((error: HttpErrorModel) => {
        if (
          error.details?.[0]?.type === OccHttpErrorType.CLASS_MISMATCH_ERROR
        ) {
          this.globalMessageService.add(
            { key: 'httpHandlers.forbidden' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          this.paymentTypesError = true;
        }
        return of([]);
      })
    );

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
        PaymentType[],
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
          this.subscription.add(
            this.checkoutPaymentTypeFacade
              .setPaymentType(
                availablePaymentTypes[0].code as string,
                this.poNumberInputElement?.nativeElement?.value
              )
              .pipe(take(1))
              .subscribe({
                complete: () => this.onSuccess(),
                error: () => this.onError(),
              })
          );
          return availablePaymentTypes[0];
        }
        return undefined;
      }
    ),
    filter(isNotUndefined),
    distinctUntilChanged(),
    tap((selected) => {
      this.typeSelected = selected?.code;
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.PAYMENT_DETAILS,
        selected?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      );
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.REVIEW_ORDER,
        selected?.code === B2BPaymentTypeEnum.CARD_PAYMENT
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

  protected subscription: Subscription = new Subscription();
  protected poNumberValue: string | undefined;

  constructor(
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    // Store the PO number value from the observable
    this.subscription.add(
      this.cartPoNumber$.subscribe((poNumber) => {
        this.poNumberValue = poNumber;
        this.updatePoNumberField();
      })
    );
  }

  ngAfterViewInit(): void {
    this.updatePoNumberField();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected updatePoNumberField(): void {
    if (this.poNumberInputElement?.nativeElement && this.poNumberValue) {
      this.poNumberInputElement.nativeElement.value = this.poNumberValue;
    }
  }

  changeType(code: string): void {
    this.busy$.next(true);
    this.typeSelected = code;

    this.subscription.add(
      this.checkoutPaymentTypeFacade
        .setPaymentType(code, this.poNumberInputElement?.nativeElement.value)
        .pipe(take(1))
        .subscribe({
          complete: () => this.onSuccess(),
          error: () => this.onError(),
        })
    );
  }

  next(): void {
    if (!this.typeSelected) {
      return;
    }

    const poNumberInput = this.poNumberInputElement?.nativeElement.value;
    // if the PO number didn't change
    if (poNumberInput === getLastValueSync(this.cartPoNumber$)) {
      this.checkoutStepService.next(this.activatedRoute);
      return;
    }

    this.busy$.next(true);
    this.subscription.add(
      this.checkoutPaymentTypeFacade
        .setPaymentType(this.typeSelected, poNumberInput)
        .pipe(take(1))
        .subscribe({
          // we don't call onSuccess here, because it can cause a spinner flickering
          complete: () => this.checkoutStepService.next(this.activatedRoute),
          error: () => this.onError(),
        })
    );
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

  handlePaymentChange(payment: OpfActiveConfiguration): void {
    if (payment.merchantId === 'B2B_ACCOUNT') {
      this.changeType(B2BPaymentTypeEnum.ACCOUNT_PAYMENT);
    } else {
      this.changeType(B2BPaymentTypeEnum.CARD_PAYMENT);
    }
  }
}
