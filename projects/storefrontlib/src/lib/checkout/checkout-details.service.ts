import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
  map,
  multicast,
  refCount,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { CheckoutService, CartService, AuthService } from '@spartacus/core';

@Injectable()
export class CheckoutDetailsService {
  checkoutDetails$: Observable<any>;
  userId$: Observable<any>;
  cartId$: Observable<any>;

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
      .pipe(map(cartData => cartData.guid));

    this.checkoutDetails$ = this.userId$.pipe(
      withLatestFrom(this.cartId$),
      tap(([userId, cartId]: [string, string]) =>
        this.checkoutService.loadCheckoutDetails(userId, cartId)
      ),
      // TODO: Replace next two lines with shareReplay(1, undefined, true) when RxJS 6.4 will be in use
      multicast(() => new ReplaySubject(1)),
      refCount()
    );
  }

  getCheckoutDetails(): Observable<any> {
    return this.checkoutDetails$.pipe(
      switchMap(() => this.checkoutService.getCheckoutDetails())
    );
  }
}
