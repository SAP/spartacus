import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { CheckoutService } from '../services/checkout.service';

@Injectable()
export class OrderConfirmationPageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    if (this.orderDetailsPresent()) {
      return of(true);
    }

    this.router.navigate(['/my-account/orders']);
    return of(false);
  }

  private orderDetailsPresent(): boolean {
    const orderDetails = this.checkoutService.orderDetails;
    return orderDetails && Object.keys(orderDetails).length !== 0;
  }
}
