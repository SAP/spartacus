import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class PaymentTypeComponent implements OnInit {
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

  @ViewChild('poNumber', { static: false })
  poNumberInput: ElementRef;

  typeSelected: string;

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  constructor(
    protected paymentTypeService: PaymentTypeService,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkoutStepService.resetSteps();
  }

  changeType(code: string): void {
    this.typeSelected = code;

    this.checkoutStepService.disableEnableStep(
      CheckoutStepType.PAYMENT_DETAILS,
      this.typeSelected === 'ACCOUNT'
    );
  }

  next(): void {
    // here need set payment type, will implemented in #6655
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }
}
