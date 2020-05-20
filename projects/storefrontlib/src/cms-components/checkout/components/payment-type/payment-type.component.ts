import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentTypeService, PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  > = this.paymentTypeService.getPaymentTypes().pipe(
    tap((paymentTypes) => {
      if (paymentTypes && paymentTypes.length > 0) {
        // Now we use the first type as the default selected type
        // This value should be read from cart.
        // The `set PaymentType to cart` will be implemented in #6655
        this.typeSelected = paymentTypes[0].code;
      }
    })
  );

  typeSelected: string;

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService
  ) {}

  changeType(code: string): void {
    this.typeSelected = code;

    this.checkoutStepService.resetSteps();

    this.checkoutStepService.disableEnableStep(
      CheckoutStepType.PAYMENT_DETAILS,
      this.typeSelected === this.ACCOUNT_PAYMENT
    );
  }
}
