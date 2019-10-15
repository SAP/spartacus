import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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

  constructor(
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
        }
      })
    );
  }

  changeType(code: string): void {
    //if (code !== this.currentDeliveryModeId) {
    //  this.currentDeliveryModeId = code;
    //}
    this.checkoutConfigService.disableStep(CheckoutStepType.PAYMENT_DETAILS);
    console.log(code);
  }

  next(): void {
    this.routingService.go(this.checkoutStepUrlNext);
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }

  ngOnDestroy(): void {}
}
