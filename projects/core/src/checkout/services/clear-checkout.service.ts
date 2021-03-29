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
   * Use it to clear checkout state
   */
  resetCheckoutProcesses(): void {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
  }
}
