import { Injectable, isDevMode } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap, switchMap, take } from 'rxjs/operators';
import {
  Address,
  RoutingConfigService,
  PaymentTypeService,
  CheckoutCostCenterService,
} from '@spartacus/core';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepsSetGuard implements CanActivate {
  constructor(
    private paymentTypeService: PaymentTypeService,
    private checkoutStepService: CheckoutStepService,
    private checkoutDetailsService: CheckoutDetailsService,
    private routingConfigService: RoutingConfigService,
    private checkoutCostCenterService: CheckoutCostCenterService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let currentIndex = -1;
    const currentRouteUrl = '/' + route.url.join('/');

    // check whether the previous step is set
    return combineLatest([
      this.checkoutStepService.steps$,
      this.paymentTypeService.isAccountPayment(),
    ]).pipe(
      tap(([, isAccount]) => {
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.PAYMENT_DETAILS,
          isAccount
        );
      }),
      take(1),
      switchMap(([steps, isAccount]) => {
        steps.forEach((step, index) => {
          const stepRouteUrl = `/${
            this.routingConfigService.getRouteConfig(step.routeName).paths[0]
          }`;
          if (stepRouteUrl === currentRouteUrl) {
            currentIndex = index;
          }
        });
        this.validateCurrentStep(currentIndex, steps, currentRouteUrl);
        return this.isPreviousStepSet(steps[currentIndex - 1], isAccount);
      })
    );
  }

  protected validateCurrentStep(
    currentIndex: number,
    steps: CheckoutStep[],
    routeUrl: string
  ): void {
    let currentStep: CheckoutStep;
    if (currentIndex >= 0) {
      currentStep = steps[currentIndex];
    }
    if (!currentStep && isDevMode()) {
      console.warn(
        `Missing step with route '${routeUrl}' in checkout configuration.`
      );
    }
  }

  protected isPreviousStepSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.PO_NUMBER: {
          return this.isCostCenterSet(step, isAccountPayment);
        }
        case CheckoutStepType.SHIPPING_ADDRESS: {
          return this.isShippingAddressSet(step);
        }
        case CheckoutStepType.DELIVERY_MODE: {
          return this.isDeliveryModeSet(step);
        }
        case CheckoutStepType.PAYMENT_DETAILS: {
          return this.isPaymentDetailsSet(step);
        }
        case CheckoutStepType.REVIEW_ORDER: {
          break;
        }
      }
    }
    return of(true);
  }

  protected isCostCenterSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    if (isAccountPayment) {
      return this.checkoutCostCenterService
        .getCostCenter()
        .pipe(map((cc) => (Boolean(cc) ? true : this.getUrl(step.routeName))));
    } else {
      return of(true);
    }
  }

  protected isShippingAddressSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDetailsService
      .getDeliveryAddress()
      .pipe(
        map((deliveryAddress: Address) =>
          deliveryAddress && Object.keys(deliveryAddress).length
            ? true
            : this.getUrl(step.routeName)
        )
      );
  }

  protected isDeliveryModeSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDetailsService
      .getSelectedDeliveryModeCode()
      .pipe(
        map((mode: string) =>
          mode && mode.length ? true : this.getUrl(step.routeName)
        )
      );
  }

  protected isPaymentDetailsSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDetailsService
      .getPaymentDetails()
      .pipe(
        map((paymentDetails) =>
          paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)
        )
      );
  }

  protected getUrl(routeName: string): UrlTree {
    return this.router.parseUrl(
      this.routingConfigService.getRouteConfig(routeName).paths[0]
    );
  }
}
