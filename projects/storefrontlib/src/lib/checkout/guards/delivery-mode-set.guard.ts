import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckoutService, DeliveryMode } from '@spartacus/core';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutStep } from '../config/model/checkout-step.model';
import { CheckoutStepType } from '../config/default-checkout-config';

@Injectable()
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private checkoutConfig: CheckoutConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const route = this.checkoutConfig.checkout.steps.find(
      (step: CheckoutStep) => step.type.includes(CheckoutStepType.deliveryMode)
    );
    return this.checkoutService
      .getSelectedDeliveryMode()
      .pipe(
        map((mode: DeliveryMode) =>
          !!(mode && Object.keys(mode).length)
            ? true
            : this.router.parseUrl(route.url)
        )
      );
  }
}
