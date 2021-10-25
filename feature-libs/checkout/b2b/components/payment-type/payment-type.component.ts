import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/components';
import { CheckoutStepType } from '@spartacus/checkout/root';
import {
  B2BPaymentTypeEnum,
  isNotUndefined,
  PaymentType,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent {
  @ViewChild('poNumber', { static: false })
  private _poNumberInput: ElementRef;

  typeSelected?: string;
  cartPoNumber: string;

  paymentTypes$: Observable<PaymentType[]> =
    this.checkoutPaymentTypeService.getPaymentTypes();

  typeSelected$: Observable<PaymentType> = this.checkoutPaymentTypeService
    .getSelectedPaymentType()
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

  cartPoNumber$: Observable<string> = this.checkoutPaymentTypeService
    .getPurchaseOrderNumber()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      filter(isNotUndefined),
      tap((po) => {
        return (this.cartPoNumber = po);
      })
    );

  constructor(
    protected checkoutPaymentTypeService: CheckoutPaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeType(code: string): void {
    this.checkoutPaymentTypeService.setPaymentType(code);
    this.typeSelected = code;
  }

  next(): void {
    // set po number to cart
    const poNumInput = this._poNumberInput.nativeElement.value;
    if (this.typeSelected && poNumInput !== this.cartPoNumber) {
      this.checkoutPaymentTypeService.setPaymentType(
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
