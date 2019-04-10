import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckoutService, DeliveryMode } from '@spartacus/core';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable()
export class DeliveryModeSetGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private checkoutConfig: CheckoutConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkoutService
      .getSelectedDeliveryMode()
      .pipe(
        map((mode: DeliveryMode) =>
          !!(mode && Object.keys(mode).length)
            ? true
            : this.router.parseUrl(this.checkoutConfig.checkout.deliveryMode)
        )
      );
  }
}
