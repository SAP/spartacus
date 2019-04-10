import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  Address,
  DeliveryMode,
  PaymentDetails,
  CheckoutService,
  CartService,
  AuthService,
} from '@spartacus/core';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';

@Injectable()
export class CheckoutDetailsService {
  userId$: Observable<string>;
  cartId$: Observable<string>;
  checkoutDetails$: Observable<[string, string]>;

  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {
    this.userId$ = this.authService
      .getUserToken()
      .pipe(map(userData => userData.userId));

    this.cartId$ = this.cartService
      .getActive()
      .pipe(map(cartData => cartData.code));

    this.checkoutDetails$ = this.userId$.pipe(
      withLatestFrom(this.cartId$),
      tap(([userId, cartId]: [string, string]) =>
        this.checkoutService.loadCheckoutDetails(userId, cartId)
      ),
      shareReplay(1, undefined)
    );
  }

  getDeliveryAddress(): Observable<Address> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getDeliveryAddress())
    );
  }

  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getSelectedDeliveryMode())
    );
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getPaymentDetails())
    );
  }
}
