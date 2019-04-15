import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckoutDetailsService } from '../checkout-details.service';
import { CheckoutStep } from '../config/model/checkout-step.model';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable({
  providedIn: 'root',
})
export class ShippingAddressSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private router: Router,
    private config: CheckoutConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const route = this.config.checkout.steps.find(
      (step: CheckoutStep) => step.type.indexOf('shippingAddress') !== -1
    );
    if (!route) {
      console.warn('not provided route for shippingAddress');
    }

    return this.checkoutDetailsService.getDeliveryAddress().pipe(
      map(shippingAddress => {
        if (shippingAddress && Object.keys(shippingAddress).length !== 0) {
          return true;
        } else {
          return this.router.parseUrl(route && route.url);
        }
      })
    );
  }
}
