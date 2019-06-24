import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { BaseConfig, RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutConfigService } from '../checkout-config.service';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutDetailsService } from '../services/checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private checkoutConfigService: CheckoutConfigService,
    private routingConfigService: RoutingConfigService,
    private router: Router,
    private serverConfig: BaseConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutConfigService.getCheckoutStep(
      CheckoutStepType.PAYMENT_DETAILS
    );

    if (!checkoutStep && !this.serverConfig.production) {
      console.warn(
        `Missing step with type ${
          CheckoutStepType.PAYMENT_DETAILS
        } in checkout configuration.`
      );
    }

    return this.checkoutDetailsService
      .getPaymentDetails()
      .pipe(
        map(paymentDetails =>
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
