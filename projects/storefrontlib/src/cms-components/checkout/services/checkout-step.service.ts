import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfigService } from './checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepService {
  // initial enabled steps
  intialSteps: CheckoutStep[] = this.checkoutConfigService.steps
    .filter((step) => !step.disabled)
    .map((x) => Object.assign({}, x));

  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    this.intialSteps
  );

  constructor(
    protected routingService: RoutingService,
    protected checkoutConfigService: CheckoutConfigService
  ) {}

  back(activatedRoute: ActivatedRoute): void {
    const previousUrl = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      activatedRoute
    );
    this.routingService.go(previousUrl === null ? 'cart' : previousUrl);
  }

  next(activatedRoute: ActivatedRoute): void {
    const nextUrl = this.checkoutConfigService.getNextCheckoutStepUrl(
      activatedRoute
    );
    this.routingService.go(nextUrl);
  }

  getBackBntText(activatedRoute: ActivatedRoute): string {
    if (
      this.checkoutConfigService.getPreviousCheckoutStepUrl(activatedRoute) ===
      null
    ) {
      return 'checkout.backToCart';
    }

    return 'common.back';
  }

  resetSteps(): void {
    this.intialSteps = this.checkoutConfigService.steps
      .filter((step) => !step.disabled)
      .map((x) => Object.assign({}, x));
    this.steps$.next(this.intialSteps);
  }

  disableEnableStep(
    currentStepType: CheckoutStepType,
    disabled: boolean
  ): void {
    const currentStep = this.intialSteps.find((step) =>
      step.type.includes(currentStepType)
    );
    if (currentStep) {
      currentStep.disabled = disabled;
      this.steps$.next(this.intialSteps.filter((step) => !step.disabled));
    }
  }
}
