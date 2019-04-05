import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoutingService, CheckoutService } from '@spartacus/core';
import { defaultCheckoutConfig } from '../config/default-checkout-config';

@Injectable()
export class ShippingAddressSetGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutService.getDeliveryAddress().pipe(
      map(shippingAddress => {
        if (shippingAddress && Object.keys(shippingAddress).length !== 0) {
          return true;
        } else {
          this.routingService.go({
            route: [defaultCheckoutConfig.checkout.steps[0]],
          });
          return false;
        }
      })
    );
  }
}
