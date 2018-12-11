import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckoutService } from '@spartacus/core';

@Injectable()
export class OrderConfirmationPageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutService.orderDetails$.pipe(
      map(orderDetails => {
        if (orderDetails && Object.keys(orderDetails).length !== 0) {
          return true;
        } else {
          this.router.navigate(['/my-account/orders']);
          return false;
        }
      })
    );
  }
}
