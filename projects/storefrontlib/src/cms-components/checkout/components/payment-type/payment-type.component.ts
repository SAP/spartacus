import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentType, PaymentTypeService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CheckoutStepType } from '../../model/checkout-step.model';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent {
  readonly ACCOUNT_PAYMENT = 'ACCOUNT';

  paymentTypes$: Observable<
    PaymentType[]
  > = this.paymentTypeService.getPaymentTypes();

  typeSelected: string;
  typeSelected$: Observable<
    string
  > = this.paymentTypeService.getSelectedPaymentType().pipe(
    filter((selected) => selected !== undefined),
    tap((selected) => {
      this.typeSelected = selected;
      this.checkoutStepService.resetSteps();
      this.checkoutStepService.disableEnableStep(
        CheckoutStepType.PAYMENT_DETAILS,
        selected === this.ACCOUNT_PAYMENT
      );
    })
  );

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService
  ) {}

  changeType(code: string): void {
    this.paymentTypeService.setPaymentType(code);
    this.typeSelected = code;
    this.checkoutStepService.gotToStep(0);
  }
}
