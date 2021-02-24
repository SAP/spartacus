import { Injectable } from '@angular/core';
import { CheckoutDeliveryService } from '../facade/checkout-delivery.service';
import { CheckoutPaymentService } from '../facade/checkout-payment.service';

@Injectable({
  providedIn: 'root',
})
export class ClearCheckoutService {
  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService
  ) {}

  /**
   * We can use it globally to clear checkout store state
   */
  resetCheckoutProcesses(): void {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
  }
}
