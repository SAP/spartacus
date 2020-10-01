import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/core';
import {
  CheckoutConfig,
  DeliveryModePreferences,
} from '../config/checkout-config';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConfigService {
  private express: boolean = this.checkoutConfig.checkout.express;
  private guest: boolean = this.checkoutConfig.checkout.guest;
  private defaultDeliveryMode: Array<DeliveryModePreferences | string> =
    this.checkoutConfig.checkout.defaultDeliveryMode || [];

  constructor(private checkoutConfig: CheckoutConfig) {}

  protected compareDeliveryCost(
    deliveryMode1: DeliveryMode,
    deliveryMode2: DeliveryMode
  ): number {
    if (deliveryMode1.deliveryCost.value > deliveryMode2.deliveryCost.value) {
      return 1;
    } else if (
      deliveryMode1.deliveryCost.value < deliveryMode2.deliveryCost.value
    ) {
      return -1;
    }
    return 0;
  }

  protected findMatchingDeliveryMode(
    deliveryModes: DeliveryMode[],
    index = 0
  ): string {
    switch (this.defaultDeliveryMode[index]) {
      case DeliveryModePreferences.FREE:
        if (deliveryModes[0].deliveryCost.value === 0) {
          return deliveryModes[0].code;
        }
        break;
      case DeliveryModePreferences.LEAST_EXPENSIVE:
        const leastExpensiveFound = deliveryModes.find(
          (deliveryMode) => deliveryMode.deliveryCost.value !== 0
        );
        if (leastExpensiveFound) {
          return leastExpensiveFound.code;
        }
        break;
      case DeliveryModePreferences.MOST_EXPENSIVE:
        return deliveryModes[deliveryModes.length - 1].code;
      default:
        const codeFound = deliveryModes.find(
          (deliveryMode) =>
            deliveryMode.code === this.defaultDeliveryMode[index]
        );
        if (codeFound) {
          return codeFound.code;
        }
    }
    const lastMode = this.defaultDeliveryMode.length - 1 <= index;
    return lastMode
      ? deliveryModes[0].code
      : this.findMatchingDeliveryMode(deliveryModes, index + 1);
  }

  getPreferredDeliveryMode(deliveryModes: DeliveryMode[]): string {
    deliveryModes.sort(this.compareDeliveryCost);
    return this.findMatchingDeliveryMode(deliveryModes);
  }

  isExpressCheckout(): boolean {
    return this.express;
  }

  isGuestCheckout(): boolean {
    return this.guest;
  }
}
