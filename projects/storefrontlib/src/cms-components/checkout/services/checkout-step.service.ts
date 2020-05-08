import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfigService } from './checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepService {
  // initial enabled steps
  intialSteps: CheckoutStep[];

  readonly steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<
    CheckoutStep[]
  >(undefined);

  readonly activeStepIndex$: Observable<
    number
  > = this.routingService.getRouterState().pipe(
    switchMap((router) => {
      const activeStepUrl = router.state.context.id;
      return this.steps$.pipe(
        map((steps) => {
          let activeIndex;
          steps.forEach((step, index) => {
            const routeUrl = `/${
              this.routingConfigService.getRouteConfig(step.routeName).paths[0]
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
    protected checkoutConfigService: CheckoutConfigService,
    protected routingConfigService: RoutingConfigService
  ) {
    this.resetSteps();
  }

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
