import { Injectable } from '@angular/core';
import { CheckoutConfig } from './config/checkout-config';
import { CheckoutStepType } from './config/default-checkout-config';
import { CheckoutStep } from './config/model/checkout-step.model';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CheckoutConfigService {
  steps: CheckoutStep[] = this.checkoutConfig.checkout.steps;

  constructor(private checkoutConfig: CheckoutConfig) {}

  getCheckoutStep(currentStepType: CheckoutStepType): CheckoutStep {
    return this.steps[this.getCheckoutStepIndex('type', currentStepType)];
  }

  getNextCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const currentStepUrl: string = this.getStepUrlFromActivatedRoute(
      activatedRoute
    );
    const index: number = this.getCheckoutStepIndex('url', currentStepUrl);

    return index >= 0 && this.steps[index + 1]
      ? this.steps[index + 1].url
      : null;
  }

  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const currentStepUrl: string = this.getStepUrlFromActivatedRoute(
      activatedRoute
    );
    const index: number = this.getCheckoutStepIndex('url', currentStepUrl);

    return index >= 1 && this.steps[index - 1]
      ? this.steps[index - 1].url
      : null;
  }

  private getStepUrlFromActivatedRoute(activatedRoute: ActivatedRoute) {
    return activatedRoute &&
      activatedRoute.snapshot &&
      activatedRoute.snapshot.url
      ? `/${activatedRoute.snapshot.url.join('/')}`
      : null;
  }

  private getCheckoutStepIndex(key: string, value: any): number {
    return key && value
      ? this.steps.findIndex((step: CheckoutStep) => step[key].includes(value))
      : null;
  }
}
