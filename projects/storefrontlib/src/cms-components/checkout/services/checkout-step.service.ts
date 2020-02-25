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
    .filter(step => !step.disabled)
    .map(x => Object.assign({}, x));

  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    this.intialSteps
  );

  constructor(
    protected routingService: RoutingService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  back(): void {
    const previousUrl = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );

    if (previousUrl === null) {
      this.routingService.go('cart');
    } else {
      this.routingService.go(previousUrl);
    }
  }

  next(): void {
    const nextUrl = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.routingService.go(nextUrl);
  }

  getBackBntText(): string {
    if (
      this.checkoutConfigService.getPreviousCheckoutStepUrl(
        this.activatedRoute
      ) === null
    ) {
      return 'checkout.backToCart';
    }
  }

  resetSteps(): void {
    this.intialSteps = this.checkoutConfigService.steps
      .filter(step => !step.disabled)
      .map(x => Object.assign({}, x));
    this.steps$.next(this.intialSteps);
  }

  disableEnableStep(
    currentStepType: CheckoutStepType,
    disabled: boolean
  ): void {
    const currentStep = this.intialSteps.find(step =>
      step.type.includes(currentStepType)
    );
    if (currentStep) {
      currentStep.disabled = disabled;
      this.steps$.next(this.intialSteps.filter(step => !step.disabled));
    }
  }
}
