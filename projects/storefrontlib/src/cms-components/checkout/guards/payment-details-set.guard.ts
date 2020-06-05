import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RoutingConfigService, PaymentTypeService } from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private checkoutStepService: CheckoutStepService,
    private routingConfigService: RoutingConfigService,
    private paymentTypeService: PaymentTypeService,
    private router: Router
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

    return combineLatest([
      this.paymentTypeService.getSelectedPaymentType(),
      this.checkoutDetailsService.getPaymentDetails(),
    ]).pipe(
      filter(([selected, _]) => selected !== undefined),
      tap(([selected, _]) =>
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.PAYMENT_DETAILS,
          selected === this.paymentTypeService.ACCOUNT_PAYMENT
        )
      ),
      map(([_, paymentDetails]) => {
        if (checkoutStep && checkoutStep.disabled) {
          return true;
        } else {
          return paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.router.parseUrl(
                checkoutStep &&
                  this.routingConfigService.getRouteConfig(
                    checkoutStep.routeName
                  ).paths[0]
              );
        }
      })
    );
  }
}
