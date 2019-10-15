import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  PaymentType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepType } from '../../model/checkout-step.model';
import { AbstractCheckoutStepComponent } from '../abstract-checkout-step/abstract-checkout-step.component';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent extends AbstractCheckoutStepComponent
  implements OnInit, OnDestroy {
  paymentTypes$: Observable<PaymentType[]>;

  typeSelected: string;

  form: FormGroup = this.fb.group({
    typeCode: ['', Validators.required],
  });

  constructor(
    protected fb: FormBuilder,
    protected routingService: RoutingService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(checkoutConfigService, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();

    this.checkoutConfigService.resetSteps();

    this.paymentTypes$ = this.checkoutPaymentService.getPaymentTypes().pipe(
      tap(paymentTypes => {
        if (Object.keys(paymentTypes).length === 0) {
          this.checkoutPaymentService.loadSupportedPaymentTypes();
        } else {
          this.typeSelected = paymentTypes[0].code;
        }
      })
    );
  }

  changeType(code: string): void {
    this.typeSelected = code;
    if (this.typeSelected === 'ACCOUNT') {
      this.checkoutConfigService.disableStep(CheckoutStepType.PAYMENT_DETAILS);
    } else {
      this.checkoutConfigService.enableStep(CheckoutStepType.PAYMENT_DETAILS);
    }
  }

  next(): void {
    this.checkoutPaymentService.setPaymentType(this.typeSelected)
    this.routingService.go(this.checkoutStepUrlNext);
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }

  ngOnDestroy(): void {}
}
