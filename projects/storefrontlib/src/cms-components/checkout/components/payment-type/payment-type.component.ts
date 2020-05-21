import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentTypeService, PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutStepType } from '../../model/checkout-step.model';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent {
  readonly ACCOUNT_PAYMENT = 'ACCOUNT';

  paymentTypes$: Observable<
    PaymentType[]
  > = this.paymentTypeService
    .getPaymentTypes()
    .pipe(tap((data) => console.log(data)));

  //typeSelected;
  typeSelected$: Observable<
    string
  > = this.paymentTypeService.getSelectedPaymentType().pipe(
    filter((selected) => selected !== ''),
    tap((selected) => {
      console.log('selected: ', selected);
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

    /*this.checkoutStepService.resetSteps();
    this.checkoutStepService.disableEnableStep(
      CheckoutStepType.PAYMENT_DETAILS,
      this.typeSelected === this.ACCOUNT_PAYMENT
    );*/
  }
}
