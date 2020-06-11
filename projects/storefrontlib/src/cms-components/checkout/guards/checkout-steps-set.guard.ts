import { Injectable, isDevMode } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { map, filter, switchMap, withLatestFrom } from 'rxjs/operators';
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
    let currentStep: CheckoutStep;
    const currentIndex = this.checkoutStepService.getCurrentStepIndex(<
      ActivatedRoute
    >{ snapshot: route });
    if (currentIndex >= 0) {
      currentStep = this.checkoutStepService.allSteps[currentIndex];
    }

    if (!currentStep && isDevMode()) {
      console.warn(
        `Missing step with route '${route.url.join(
          '/'
        )}' in checkout configuration.`
      );
    }

    // check whether the previous step is set
    const step = this.checkoutStepService.allSteps[currentIndex - 1];
    console.log('previous step: ', step);
    if (step && !step.disabled) {
      switch (step.type[0]) {
        case CheckoutStepType.PO_NUMBER: {
          return this.isCostCenterSet(step);
        }
        case CheckoutStepType.SHIPPING_ADDRESS: {
          return this.isShippingAddressSet(step);
        }
        case CheckoutStepType.DELIVERY_MODE: {
          break;
        }
        case CheckoutStepType.PAYMENT_DETAILS: {
          break;
        }
        case CheckoutStepType.REVIEW_ORDER: {
          break;
        }
      }
    }
    return of(true);
  }

  protected isCostCenterSet(step: CheckoutStep): Observable<boolean | UrlTree> {
    /*return combineLatest([
      this.paymentTypeService.isAccountPayment(),
      this.checkoutCostCenterService.getCostCenter(),
    ]).pipe(
      map(([isAccount, cc]) => {
        console.log(isAccount);
        console.log(cc);
        if (isAccount) {
          return Boolean(cc) ? true : this.getUrl(step.routeName);
        } else {
          return true;
        }
      })
    );*/
    return this.paymentTypeService.isAccountPayment().pipe(
      switchMap((isAccount) => {
        console.log(isAccount);
        if (isAccount) {
          return this.checkoutCostCenterService.getCostCenter().pipe(
            filter((cc) => cc !== undefined),
            map((cc) => {
              console.log(cc);
              return Boolean(cc) ? true : this.getUrl(step.routeName);
            })
          );
        } else {
          return of(true);
        }
      })
    );
    /*return this.paymentTypeService.getSelectedPaymentType().pipe(
      filter((type) => type !== undefined),
      withLatestFrom(this.checkoutCostCenterService.getCostCenter()),
      map(([type, cc]) => {
        console.log(type);
        console.log(cc);
        if (type === this.paymentTypeService.ACCOUNT_PAYMENT) {
          return Boolean(cc) ? true : this.getUrl(step.routeName);
        } else {
          return true;
        }
      })
    );*/
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

  protected getUrl(routeName: string): UrlTree {
    return this.router.parseUrl(
      this.routingConfigService.getRouteConfig(routeName).paths[0]
    );
  }
}
