import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private routingConfigService: RoutingConfigService,
    private router: Router,
    private checkoutStepService: CheckoutStepService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutStepService.getCheckoutStep(
      CheckoutStepType.PAYMENT_DETAILS
    );

    if (!checkoutStep && isDevMode()) {
      console.warn(
        `Missing step with type ${CheckoutStepType.PAYMENT_DETAILS} in checkout configuration.`
      );
    }

    return this.checkoutDetailsService
      .getPaymentDetails()
      .pipe(
        map((paymentDetails) =>
          paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.router.parseUrl(
                checkoutStep &&
                  this.routingConfigService.getRouteConfig(
                    checkoutStep.routeName
                  ).paths[0]
              )
        )
      );
  }
}
