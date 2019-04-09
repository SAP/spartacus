import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RoutingService, CheckoutService, DeliveryMode } from '@spartacus/core';
import { CheckoutConfig } from '../config/checkout-config';

@Injectable()
export class DeliveryModePageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService,
    private checkoutConfig: CheckoutConfig
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutService.getSelectedDeliveryMode().pipe(
      map((mode: DeliveryMode) => !!(mode && Object.keys(mode).length)),
      tap((modeExists: boolean) => {
        if (!modeExists) {
          this.routingService.go({
            route: [this.checkoutConfig.checkout.deliveryMode],
          });
        }
      })
    );
  }
}
