import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { CheckoutService } from '../services/checkout.service';
import * as fromAuthStore from '../../auth/store';
import { UserToken } from '../../auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class OrderConfirmationPageGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private store: Store<fromAuthStore.AuthState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuthStore.getUserToken).pipe(
      switchMap((token: UserToken) => {
        let userLoggedIn = false;
        if (token && Object.keys(token).length !== 0) {
          userLoggedIn = true;
        }

        const orderDetailsPresent = this.orderDetailsPresent();
        if (!orderDetailsPresent) {
          let redirectTo: string;
          if (userLoggedIn) {
            redirectTo = '/my-account/orders';
          } else {
            redirectTo = '/';
          }
          this.router.navigate([redirectTo]);
        }

        return of(orderDetailsPresent);
      })
    );
  }

  private orderDetailsPresent(): boolean {
    const orderDetails = this.checkoutService.orderDetails;
    return orderDetails && Object.keys(orderDetails).length !== 0;
  }
}
