import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import //RoutingService,
'@spartacus/core';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepType } from '../../model/checkout-step.model';

@Component({
  selector: 'cx-payment-type',
  templateUrl: './payment-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
  constructor(
    //private routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService
  ) {}

  ngOnInit() {
    this.checkoutConfigService.disableStep(CheckoutStepType.PAYMENT_DETAILS);
    //console.log(this.checkoutConfigService.steps);
  }

  changeType(code: string): void {
    //if (code !== this.currentDeliveryModeId) {
    //  this.currentDeliveryModeId = code;
    //}
    console.log(code);
  }

  next(): void {
    // this.routingService.go(this.checkoutStepUrlNext);
  }

  back(): void {
    // this.routingService.go(this.checkoutStepUrlPrevious);
  }

  ngOnDestroy(): void {}
}
