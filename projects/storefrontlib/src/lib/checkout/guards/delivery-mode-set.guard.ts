import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckoutService, DeliveryMode } from '@spartacus/core';
import { CheckoutConfig } from '../config/checkout-config';
import { CheckoutStep } from '../config/model/checkout-step.model';

@Injectable()
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private checkoutConfig: CheckoutConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const type = 'deliveryMode'; // @todo: replace with default-checkout-config.ts enum imported value
    const route = this.checkoutConfig.checkout.steps.filter(
      (step: CheckoutStep) => step.type.includes(type)
    )[0];
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
