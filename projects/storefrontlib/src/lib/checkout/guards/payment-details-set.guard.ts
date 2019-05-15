import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerConfig, RoutingConfigService } from '@spartacus/core';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private routingConfigService: RoutingConfigService,
    private router: Router,
    private config: CheckoutConfig,
    private serverConfig: ServerConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const route = this.config.checkout.steps.find((step: CheckoutStep) =>
      step.type.includes(CheckoutStepType.paymentDetails)
    );
    if (!route && !this.serverConfig.production) {
      console.warn(
        'Missing step with type paymentDetails in checkout configuration.'
      );
    }

    return this.checkoutDetailsService.getPaymentDetails().pipe(
      map(paymentDetails => {
        if (paymentDetails && Object.keys(paymentDetails).length !== 0) {
          return true;
        } else {
          return this.router.parseUrl(
            route &&
              this.routingConfigService.getRouteConfig(route.route).paths[0]
          );
        }
      })
    );
  }
}
