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

@Injectable()
export class CheckoutDetailsService {
  userId$: Observable<string>;
  cartId$: Observable<string>;
  getLoaded$: Observable<boolean>;
  checkoutDetails$: Observable<boolean>;

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

    this.getLoaded$ = this.checkoutService.getCheckoutDetailsLoaded();

    this.checkoutDetails$ = this.userId$.pipe(
      withLatestFrom(this.cartId$),
      tap(([userId, cartId]: [string, string]) =>
        this.checkoutService.loadCheckoutDetails(userId, cartId)
      ),
      shareReplay(1, undefined),
      switchMap(() => this.getLoaded$),
      skipWhile(loaded => !loaded)
    );
  }

  getDeliveryAddress(): Observable<Address> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getDeliveryAddress())
    );
  }

  getSelectedDeliveryModeCode(): Observable<string> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getSelectedDeliveryModeCode())
    );
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getPaymentDetails())
    );
  }
}
