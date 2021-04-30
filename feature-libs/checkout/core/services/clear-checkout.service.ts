import { Injectable } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { CheckoutPaymentService } from '../facade/checkout-payment.service';

@Injectable()
export class ClearCheckoutService {
  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentService
  ) {}

  /**
   * Use it to clear checkout state
   */
  resetCheckoutProcesses(): void {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
  }
}
