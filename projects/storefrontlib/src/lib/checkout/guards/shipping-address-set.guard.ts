import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoutingService } from '@spartacus/core';
import { defaultCheckoutConfig } from '../config/default-checkout-config';
import { CheckoutDetailsService } from '../checkout-details.service';
import { CheckoutStep } from '../config/model/checkout-step.model';

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
            route: [
              defaultCheckoutConfig.checkout.steps.find(
                (step: CheckoutStep) =>
                  step.type.indexOf('shippingAddress') !== -1
              ).url,
            ],
          });
          return false;
        }
      })
    );
  }
}
