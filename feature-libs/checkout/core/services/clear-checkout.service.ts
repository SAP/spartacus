import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';

@Injectable()
export class ClearCheckoutService {
  constructor(
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade
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
