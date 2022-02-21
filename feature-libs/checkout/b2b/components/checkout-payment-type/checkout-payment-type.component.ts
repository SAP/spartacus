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
import { isNotUndefined } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './checkout-payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentTypeComponent {
  @ViewChild('poNumber', { static: false })
  private _poNumberInput: ElementRef;

  protected busy$ = new BehaviorSubject<boolean>(false);

  isUpdating$ = combineLatest([
    this.busy$,
    this.checkoutPaymentTypeFacade
      .getSelectedPaymentTypeState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(([busy, loading]) => busy || loading),
    distinctUntilChanged()
  );

  typeSelected?: string;
  cartPoNumber: string;

  paymentTypes$: Observable<PaymentType[]> =
    this.checkoutPaymentTypeFacade.getPaymentTypes();

  typeSelected$: Observable<PaymentType> = this.checkoutPaymentTypeFacade
    .getSelectedPaymentTypeState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
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
      tap((po) => {
        return (this.cartPoNumber = po);
      })
    );

  constructor(
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeType(code: string): void {
    this.busy$.next(true);
    this.typeSelected = code;

    this.checkoutPaymentTypeFacade.setPaymentType(code).subscribe({
      complete: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  next(): void {
    this.busy$.next(true);

    // set po number to cart
    const poNumInput = this._poNumberInput.nativeElement.value;
    if (this.typeSelected && poNumInput !== this.cartPoNumber) {
      this.checkoutPaymentTypeFacade
        .setPaymentType(this.typeSelected, poNumInput)
        .subscribe({
          complete: () => this.checkoutStepService.next(this.activatedRoute),
          error: () => this.onError(),
        });
    }
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
