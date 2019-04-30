import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  skipWhile,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  Address,
  PaymentDetails,
  CheckoutService,
  CartService,
  AuthService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDetailsService {
  userId$: Observable<string>;
  cartId$: Observable<string>;
  getCheckoutDetailsLoaded$: Observable<boolean>;

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

    this.getCheckoutDetailsLoaded$ = this.userId$.pipe(
      withLatestFrom(this.cartId$),
      tap(([userId, cartId]: [string, string]) =>
        this.checkoutService.loadCheckoutDetails(userId, cartId)
      ),
      shareReplay(1),
      switchMap(() => this.checkoutService.getCheckoutDetailsLoaded()),
      skipWhile(loaded => !loaded)
    );
  }

  getDeliveryAddress(): Observable<Address> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutService.getDeliveryAddress())
    );
  }

  getSelectedDeliveryModeCode(): Observable<string> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutService.getSelectedDeliveryModeCode())
    );
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutService.getPaymentDetails())
    );
  }
}
