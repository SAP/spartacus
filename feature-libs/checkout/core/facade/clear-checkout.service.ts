import { Injectable } from '@angular/core';
import {
  CheckoutPaymentFacade,
  ClearCheckoutFacade,
} from '@spartacus/checkout/root';

@Injectable()
export class ClearCheckoutService implements ClearCheckoutFacade {
  constructor(protected checkoutPaymentFacade: CheckoutPaymentFacade) {}

  /**
   * Use it to clear checkout state
   */
  resetCheckoutProcesses(): void {
    this.checkoutPaymentFacade.resetSetPaymentDetailsProcess();
  }
}
