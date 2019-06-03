import { Injectable } from '@angular/core';
import { CheckoutConfig } from './config/checkout-config';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStep, CheckoutStepType } from './model/checkout-step.model';
import { RoutingConfigService } from '@spartacus/core';

@Injectable()
export class CheckoutConfigService {
  steps: CheckoutStep[] = this.checkoutConfig.checkout.steps;

  constructor(
    private checkoutConfig: CheckoutConfig,
    private routingConfigService: RoutingConfigService
  ) {}

  getCheckoutStep(currentStepType: CheckoutStepType): CheckoutStep {
    return this.steps[this.getCheckoutStepIndex('type', currentStepType)];
  }

  getNextCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex + 1]
      ? this.getStepUrlFromStepRoute(this.steps[stepIndex + 1].routeName)
      : null;
  }

  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex - 1]
      ? this.getStepUrlFromStepRoute(this.steps[stepIndex - 1].routeName)
      : null;
  }

  getCurrentStepIndex(activatedRoute: ActivatedRoute) {
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

  private getStepUrlFromActivatedRoute(activatedRoute: ActivatedRoute) {
    return activatedRoute &&
      activatedRoute.snapshot &&
      activatedRoute.snapshot.url
      ? `/${activatedRoute.snapshot.url.join('/')}`
      : null;
  }

  private getStepUrlFromStepRoute(stepRoute: string) {
    return this.routingConfigService.getRouteConfig(stepRoute).paths[0];
  }

  private getCheckoutStepIndex(key: string, value: any): number {
    return key && value
      ? this.steps.findIndex((step: CheckoutStep) => step[key].includes(value))
      : null;
  }
}
