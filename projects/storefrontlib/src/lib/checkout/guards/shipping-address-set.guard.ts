import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoutingService } from '@spartacus/core';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../checkout-details.service';

@Injectable()
export class ShippingAddressSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutDetailsService.getDeliveryAddress().pipe(
      map(shippingAddress => {
        if (shippingAddress && Object.keys(shippingAddress).length !== 0) {
          return true;
        } else {
          this.routingService.go({
            route: [defaultCheckoutConfig.checkout.shippingAddress],
          });
          return false;
        }
      })
    );
  }
}
