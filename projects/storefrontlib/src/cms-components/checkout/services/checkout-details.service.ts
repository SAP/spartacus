import { Injectable } from '@angular/core';
import {
  Address,
  CartService,
  CheckoutService,
  PaymentDetails,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  skipWhile,
  switchMap,
  tap,
  filter,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDetailsService {
  cartId$: Observable<string>;
  getCheckoutDetailsLoaded$: Observable<boolean>;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {
    this.cartId$ = this.cartService.getActive().pipe(
      map(cartData => cartData.code),
      filter(cartId => !!cartId)
    );

    this.getCheckoutDetailsLoaded$ = this.cartId$.pipe(
      tap(cartId => this.checkoutService.loadCheckoutDetails(cartId)),
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
