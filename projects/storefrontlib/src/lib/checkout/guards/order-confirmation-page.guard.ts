import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { CheckoutService } from '../facade/checkout.service';

@Injectable()
export class OrderConfirmationPageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutService.orderDetails$.pipe(
      map(orderDetails => {
        if (orderDetails && Object.keys(orderDetails).length !== 0) {
          return true;
        } else {
          this.routingService.translateAndGo({ route: ['orders'] });
          return false;
        }
      })
    );
  }
}
