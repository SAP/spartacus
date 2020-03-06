import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Address,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CheckoutService,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  skipWhile,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDetailsService {
  cartId$: Observable<string>;
  getCheckoutDetailsLoaded$: Observable<boolean>;

  constructor(
    private checkoutService: CheckoutService,
    private checkoutDeliveryService: CheckoutDeliveryService,
    private checkoutPaymentService: CheckoutPaymentService,
    protected activeCartService: ActiveCartService
  ) {
    this.cartId$ = this.activeCartService.getActive().pipe(
      map(cartData => {
        if (
          (cartData.user && cartData.user.uid === OCC_USER_ID_ANONYMOUS) ||
          this.activeCartService.isGuestCart()
        ) {
          return cartData.guid;
        }
        return cartData.code;
      }),
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
      switchMap(() => this.checkoutDeliveryService.getDeliveryAddress())
    );
  }

  getSelectedDeliveryModeCode(): Observable<string> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() =>
        this.checkoutDeliveryService.getSelectedDeliveryModeCode()
      )
    );
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutPaymentService.getPaymentDetails())
    );
  }
}
