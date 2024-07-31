/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutConfig,
  DeliveryModePreferences,
} from '@spartacus/checkout/base/root';
import { CheckoutFlowOrchestratorService } from './checkout-flow-orchestrator.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConfigService {
  protected checkoutFlowOrchestratorService = inject(
    CheckoutFlowOrchestratorService
  );

  private express: boolean = this.checkoutConfig.checkout?.express ?? false;
  private guest: boolean = this.checkoutConfig.checkout?.guest ?? false;
  private defaultDeliveryMode: Array<DeliveryModePreferences | string> =
    this.checkoutConfig.checkout?.defaultDeliveryMode || [];

  protected checkoutFlow =
    this.checkoutFlowOrchestratorService?.getCheckoutFlow();

  constructor(private checkoutConfig: CheckoutConfig) {
    if (this.checkoutFlowOrchestratorService) {
      this.express = this.checkoutFlow?.express ?? false;
      this.guest = this.checkoutFlow?.guest ?? false;
      this.defaultDeliveryMode = this.checkoutFlow?.defaultDeliveryMode || [];
    }
  }

  protected compareDeliveryCost(
    deliveryMode1: DeliveryMode,
    deliveryMode2: DeliveryMode
  ): number {
    if (
      deliveryMode1.deliveryCost?.value &&
      deliveryMode2.deliveryCost?.value
    ) {
      if (deliveryMode1.deliveryCost.value > deliveryMode2.deliveryCost.value) {
        return 1;
      } else if (
        deliveryMode1.deliveryCost.value < deliveryMode2.deliveryCost.value
      ) {
        return -1;
      }
    }
    return 0;
  }

  protected findMatchingDeliveryMode(
    deliveryModes: DeliveryMode[],
    index = 0
  ): string | undefined {
    switch (this.defaultDeliveryMode[index]) {
      case DeliveryModePreferences.FREE:
        if (deliveryModes[0].deliveryCost?.value === 0) {
          return deliveryModes[0].code;
        }
        break;
      case DeliveryModePreferences.LEAST_EXPENSIVE:
        const leastExpensiveFound = deliveryModes.find(
          (deliveryMode) => deliveryMode.deliveryCost?.value !== 0
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

  shouldUseAddressSavedInCart(): boolean {
    if (this.checkoutFlowOrchestratorService) {
      return !!this.checkoutFlow?.guestUseSavedAddress;
    }

    return !!this.checkoutConfig?.checkout?.guestUseSavedAddress;
  }

  getPreferredDeliveryMode(deliveryModes: DeliveryMode[]): string | undefined {
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
