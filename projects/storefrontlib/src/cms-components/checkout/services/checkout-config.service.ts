import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryMode, RoutingConfigService } from '@spartacus/core';
import {
  CheckoutConfig,
  DeliveryModePreferences,
} from '../config/checkout-config';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConfigService {
  steps: CheckoutStep[] = this.checkoutConfig.checkout.steps;
  private express: boolean = this.checkoutConfig.checkout.express;
  private guest: boolean = this.checkoutConfig.checkout.guest;
  private defaultDeliveryMode: Array<DeliveryModePreferences | string> =
    this.checkoutConfig.checkout.defaultDeliveryMode || [];

  constructor(
    private checkoutConfig: CheckoutConfig,
    private routingConfigService: RoutingConfigService
  ) {}

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getCheckoutStep(currentStepType: CheckoutStepType): CheckoutStep {
    return this.steps[this.getCheckoutStepIndex('type', currentStepType)];
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getCheckoutStepRoute(currentStepType: CheckoutStepType): string {
    return this.getCheckoutStep(currentStepType).routeName;
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getFirstCheckoutStepRoute(): string {
    return this.steps[0].routeName;
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getNextCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex + 1]
      ? this.getStepUrlFromStepRoute(this.steps[stepIndex + 1].routeName)
      : null;
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex - 1]
      ? this.getStepUrlFromStepRoute(this.steps[stepIndex - 1].routeName)
      : null;
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  getCurrentStepIndex(activatedRoute: ActivatedRoute): number | null {
    const currentStepUrl: string = this.getStepUrlFromActivatedRoute(
      activatedRoute
    );

    let stepIndex: number;
    let index = 0;
    for (const step of this.steps) {
      if (
        currentStepUrl === `/${this.getStepUrlFromStepRoute(step.routeName)}`
      ) {
        stepIndex = index;
      } else {
        index++;
      }
    }

    return stepIndex >= 0 ? stepIndex : null;
  }

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

  /**
   * will be removed, there is same function in checkout-step.service
   */
  private getStepUrlFromActivatedRoute(
    activatedRoute: ActivatedRoute
  ): string | null {
    return activatedRoute &&
      activatedRoute.snapshot &&
      activatedRoute.snapshot.url
      ? `/${activatedRoute.snapshot.url.join('/')}`
      : null;
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  private getStepUrlFromStepRoute(stepRoute: string): string {
    return this.routingConfigService.getRouteConfig(stepRoute).paths[0];
  }

  /**
   * will be removed, there is same function in checkout-step.service
   */
  private getCheckoutStepIndex(key: string, value: any): number | null {
    return key && value
      ? this.steps.findIndex((step: CheckoutStep) => step[key].includes(value))
      : null;
  }
}
