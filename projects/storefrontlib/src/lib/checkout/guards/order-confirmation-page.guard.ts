import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';

import { CheckoutService } from '../services/checkout.service';
import { RoutingService } from '@spartacus/core';

@Injectable()
export class OrderConfirmationPageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    if (this.orderDetailsPresent()) {
      return of(true);
    }

    this.routingService.goToPage(['myAccount_orders']);
    return of(false);
  }

  private orderDetailsPresent(): boolean {
    const orderDetails = this.checkoutService.orderDetails;
    return orderDetails && Object.keys(orderDetails).length !== 0;
  }
}
