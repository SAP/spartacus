import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  B2BPaymentTypeEnum,
  PaymentType,
  PaymentTypeService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { CheckoutStepType } from '../../model/checkout-step.model';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent {
  @ViewChild('poNumber', { static: false })
  private _poNumberInput: ElementRef;

  typeSelected: string;
  cartPoNumber: string;

  paymentTypes$: Observable<
    PaymentType[]
  > = this.paymentTypeService.getPaymentTypes();

  typeSelected$: Observable<
    string
  > = this.paymentTypeService.getSelectedPaymentType().pipe(
    filter((selected) => selected !== undefined),
    distinctUntilChanged(),
    tap((selected) => {
      this.typeSelected = selected;
      this.checkoutStepService.resetSteps();
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.PAYMENT_DETAILS,
        selected === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
      );
    })
  );

  cartPoNumber$: Observable<
    string
  > = this.paymentTypeService.getPoNumber().pipe(
    filter((po) => po !== undefined),
    tap((po) => {
      return (this.cartPoNumber = po);
    })
  );

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeType(code: string): void {
    this.paymentTypeService.setPaymentType(code);
    this.typeSelected = code;
  }

  next(): void {
    // set po number to cart
    const poNumInput = this._poNumberInput.nativeElement.value;
    if (this.typeSelected && poNumInput !== this.cartPoNumber) {
      this.paymentTypeService.setPaymentType(this.typeSelected, poNumInput);
    }

    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }
}
