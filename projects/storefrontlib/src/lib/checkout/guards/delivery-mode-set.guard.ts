import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerConfig } from '@spartacus/core';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutStep } from '../config/model/checkout-step.model';
import { CheckoutStepType } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private router: Router,
    private checkoutConfig: CheckoutConfig,
    private serverConfig: ServerConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const route = this.checkoutConfig.checkout.steps.find(
      (step: CheckoutStep) => step.type.includes(CheckoutStepType.deliveryMode)
    );

    if (!route && !this.serverConfig.production) {
      console.warn(
        `Missing step with type ${
          CheckoutStepType.deliveryMode
        } in checkout configuration.`
      );
    }

    return this.checkoutDetailsService
      .getSelectedDeliveryModeCode()
      .pipe(
        map((mode: string) =>
          mode.length ? true : this.router.parseUrl(route && route.url)
        )
      );
  }
}
