/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutConfig,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckoutFlowOrchestratorService } from './checkout-flow-orchestrator.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepService {
  protected checkoutFlowOrchestratorService = inject(
    CheckoutFlowOrchestratorService
  );

  // initial enabled steps
  allSteps: CheckoutStep[];

  readonly steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<
    CheckoutStep[]
  >([]);

  readonly activeStepIndex$: Observable<number> = this.routingService
    .getRouterState()
    .pipe(
      switchMap((router) => {
        const activeStepUrl = router.state.context.id;
        return this.steps$.pipe(
          map((steps) => {
            let activeIndex: number = 0;
            steps.forEach((step, index) => {
              const routeUrl = `/${
                this.routingConfigService.getRouteConfig(step?.routeName)
                  ?.paths?.[0]
              }`;
              if (routeUrl === activeStepUrl) {
                activeIndex = index;
              }
            });
            return activeIndex;
          })
        );
      })
    );

  constructor(
    protected routingService: RoutingService,
    protected checkoutConfig: CheckoutConfig,
    protected routingConfigService: RoutingConfigService
  ) {
    this.resetSteps();
  }

  back(activatedRoute: ActivatedRoute): void {
    const previousUrl = this.getPreviousCheckoutStepUrl(activatedRoute);
    this.routingService.go(previousUrl === null ? 'cart' : previousUrl);
  }

  next(activatedRoute: ActivatedRoute): void {
    const nextUrl = this.getNextCheckoutStepUrl(activatedRoute);
    this.routingService.go(nextUrl);
  }

  goToStepWithIndex(stepIndex: number): void {
    this.routingService.go(
      this.getStepUrlFromStepRoute(this.allSteps[stepIndex].routeName)
    );
  }

  getBackBntText(activatedRoute: ActivatedRoute): string {
    if (this.getPreviousCheckoutStepUrl(activatedRoute) === null) {
      return 'checkout.backToCart';
    }
    return 'common.back';
  }

  resetSteps(): void {
    let steps = this.checkoutConfig.checkout?.steps ?? [];

    if (this.checkoutFlowOrchestratorService) {
      steps =
        this.checkoutFlowOrchestratorService.getCheckoutFlow()?.steps ?? [];
    }

    this.allSteps = steps
      .filter((step) => !step.disabled)
      .map((checkoutStep) => Object.assign({}, checkoutStep));
    this.steps$.next(this.allSteps);
  }

  disableEnableStep(
    currentStepType: CheckoutStepType | string,
    disabled: boolean
  ): void {
    const currentStep = this.allSteps.find((step) =>
      step.type.includes(currentStepType as CheckoutStepType)
    );
    if (currentStep && currentStep.disabled !== disabled) {
      currentStep.disabled = disabled;
      this.steps$.next(this.allSteps.filter((step) => !step.disabled));
    }
  }

  getCheckoutStep(currentStepType: CheckoutStepType): CheckoutStep | undefined {
    const index = this.getCheckoutStepIndex('type', currentStepType);
    if (index !== null) {
      return this.allSteps[index];
    }
  }

  getCheckoutStepRoute(currentStepType: CheckoutStepType): string | undefined {
    return this.getCheckoutStep(currentStepType)?.routeName;
  }

  getFirstCheckoutStepRoute(): string {
    return this.allSteps[0].routeName;
  }

  getNextCheckoutStepUrl(activatedRoute: ActivatedRoute): string | null {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    if (stepIndex !== null && stepIndex >= 0) {
      let i = 1;
      while (
        this.allSteps[stepIndex + i] &&
        this.allSteps[stepIndex + i].disabled
      ) {
        i++;
      }
      const nextStep = this.allSteps[stepIndex + i];
      if (nextStep) {
        return this.getStepUrlFromStepRoute(nextStep.routeName);
      }
    }
    return null;
  }

  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string | null {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    if (stepIndex !== null && stepIndex >= 0) {
      let i = 1;
      while (
        this.allSteps[stepIndex - i] &&
        this.allSteps[stepIndex - i].disabled
      ) {
        i++;
      }
      const previousStep = this.allSteps[stepIndex - i];
      if (previousStep) {
        return this.getStepUrlFromStepRoute(previousStep.routeName);
      }
    }
    return null;
  }

  getCurrentStepIndex(activatedRoute: ActivatedRoute): number | null {
    const currentStepUrl = this.getStepUrlFromActivatedRoute(activatedRoute);

    const stepIndex = this.allSteps.findIndex(
      (step) =>
        currentStepUrl === `/${this.getStepUrlFromStepRoute(step.routeName)}`
    );
    return stepIndex === -1 ? null : stepIndex;
  }

  private getStepUrlFromActivatedRoute(
    activatedRoute: ActivatedRoute
  ): string | null {
    return activatedRoute &&
      activatedRoute.snapshot &&
      activatedRoute.snapshot.url
      ? `/${activatedRoute.snapshot.url.join('/')}`
      : null;
  }

  private getStepUrlFromStepRoute(stepRoute: string): string | null {
    return (
      this.routingConfigService.getRouteConfig(stepRoute)?.paths?.[0] ?? null
    );
  }

  private getCheckoutStepIndex(key: string, value: any): number | null {
    return key && value
      ? this.allSteps.findIndex((step: CheckoutStep) => {
          const propertyVal = step[key as keyof CheckoutStep];
          return propertyVal instanceof Array
            ? propertyVal.includes(value)
            : propertyVal === value;
        })
      : null;
  }
}
