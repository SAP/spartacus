import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
  ClearCheckoutFacade,
} from '@spartacus/checkout/root';

@Injectable()
export class ClearCheckoutService implements ClearCheckoutFacade {
  constructor(
    protected checkoutDeliveryFacade: CheckoutDeliveryFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade
  ) {}

  /**
   * Use it to clear checkout state
   */
  resetCheckoutProcesses(): void {
    this.checkoutDeliveryFacade.resetSetDeliveryAddressProcess();
    this.checkoutDeliveryFacade.resetSetDeliveryModeProcess();
    this.checkoutPaymentFacade.resetSetPaymentDetailsProcess();
  }
}
