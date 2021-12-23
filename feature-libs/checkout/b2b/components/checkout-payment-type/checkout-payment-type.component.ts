import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/main/root';
import {
  B2BPaymentTypeEnum,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { isNotUndefined } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './checkout-payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPaymentTypeComponent {
  @ViewChild('poNumber', { static: false })
  private _poNumberInput: ElementRef;

  typeSelected?: string;
  cartPoNumber: string;

  paymentTypes$: Observable<PaymentType[]> =
    this.checkoutPaymentTypeFacade.getPaymentTypes();

  changeSelectedPaymentTypeInProgress$: Observable<boolean> =
    new BehaviorSubject<boolean>(false);

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
    (
      this.changeSelectedPaymentTypeInProgress$ as BehaviorSubject<boolean>
    ).next(true);

    this.checkoutPaymentTypeFacade.setPaymentType(code).subscribe({
      complete: () =>
        (
          this.changeSelectedPaymentTypeInProgress$ as BehaviorSubject<boolean>
        ).next(false),
      error: () =>
        (
          this.changeSelectedPaymentTypeInProgress$ as BehaviorSubject<boolean>
        ).next(false),
    });

    this.typeSelected = code;
  }

  next(): void {
    // set po number to cart
    const poNumInput = this._poNumberInput.nativeElement.value;
    if (this.typeSelected && poNumInput !== this.cartPoNumber) {
      this.checkoutPaymentTypeFacade.setPaymentType(
        this.typeSelected,
        poNumInput
      );
    }

    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }
}
