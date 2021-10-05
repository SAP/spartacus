import { Injectable, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  CheckoutCostCenterFacade,
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import { RoutingConfigService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutStepService } from '../services/checkout-step.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepsSetGuard implements CanActivate {
  constructor(
    protected paymentTypeService: PaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutCostCenterService: CheckoutCostCenterFacade,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected router: Router
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
        currentIndex = steps.findIndex((step) => {
          const stepRouteUrl = `/${
            this.routingConfigService.getRouteConfig(step.routeName).paths?.[0]
          }`;
          return stepRouteUrl === currentRouteUrl;
        });
        // get current step
        let currentStep;
        if (currentIndex >= 0) {
          currentStep = steps[currentIndex];
        }
        if (Boolean(currentStep)) {
          return this.isStepSet(steps[currentIndex - 1], isAccount);
        } else {
          if (isDevMode()) {
            console.warn(
              `Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`
            );
          }
          return of(this.getUrl('checkout'));
        }
      })
    );
  }

  protected isStepSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.PAYMENT_TYPE: {
          return this.isPaymentTypeSet(step);
        }
        case CheckoutStepType.SHIPPING_ADDRESS: {
          return this.isShippingAddressAndCostCenterSet(step, isAccountPayment);
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

  protected isPaymentTypeSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.paymentTypeService.getSelectedPaymentType().pipe(
      map((paymentType) => {
        if (Boolean(paymentType)) {
          return true;
        } else {
          return this.getUrl(step.routeName);
        }
      })
    );
  }

  protected isShippingAddressAndCostCenterSet(
    step: CheckoutStep,
    isAccountPayment: boolean
  ): Observable<boolean | UrlTree> {
    return combineLatest([
      this.checkoutDeliveryService.getDeliveryAddress(),
      this.checkoutCostCenterService.getCostCenter(),
    ]).pipe(
      map(([deliveryAddress, costCenter]) => {
        if (isAccountPayment) {
          if (
            deliveryAddress &&
            Object.keys(deliveryAddress).length &&
            Boolean(costCenter)
          ) {
            return true;
          } else {
            return this.getUrl(step.routeName);
          }
        } else {
          if (
            deliveryAddress &&
            Object.keys(deliveryAddress).length &&
            costCenter === undefined
          ) {
            return true;
          } else {
            return this.getUrl(step.routeName);
          }
        }
      })
    );
  }

  protected isDeliveryModeSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutDeliveryService
      .getSelectedDeliveryMode()
      .pipe(map((mode) => (mode ? true : this.getUrl(step.routeName))));
  }

  protected isPaymentDetailsSet(
    step: CheckoutStep
  ): Observable<boolean | UrlTree> {
    return this.checkoutPaymentService
      .getPaymentDetails()
      .pipe(
        map((paymentDetails) =>
          paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)
        )
      );
  }

  private getUrl(routeName: string): UrlTree {
    return this.router.parseUrl(
      this.routingConfigService.getRouteConfig(routeName).paths?.[0] as string
    );
  }
}
