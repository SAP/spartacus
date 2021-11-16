import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  Address,
  EMAIL_PATTERN,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
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
    protected checkoutFacade: CheckoutFacade,
    protected checkoutDeliveryFacade: CheckoutDeliveryFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected activeCartFacade: ActiveCartFacade
  ) {
    this.cartId$ = this.activeCartFacade.getActive().pipe(
      map((cartData) => {
        const cartUser = cartData.user;
        if (
          cartUser &&
          (cartUser.uid === OCC_USER_ID_ANONYMOUS ||
            cartUser.uid === OCC_USER_ID_GUEST ||
            !!cartUser.uid?.split('|').slice(1).join('|').match(EMAIL_PATTERN))
        ) {
          return cartData.guid as string;
        }
        return cartData.code as string;
      }),
      filter((cartId) => !!cartId)
    );

    this.getCheckoutDetailsLoaded$ = this.cartId$.pipe(
      tap((cartId) => {
        if (cartId) {
          this.checkoutFacade.loadCheckoutDetails(cartId);
        }
      }),
      shareReplay(1),
      switchMap(() => this.checkoutFacade.getCheckoutDetailsLoaded()),
      skipWhile((loaded) => !loaded)
    );
  }

  getDeliveryAddress(): Observable<Address> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutDeliveryFacade.getDeliveryAddress())
    );
  }

  getSelectedDeliveryModeCode(): Observable<string> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutDeliveryFacade.getSelectedDeliveryModeCode())
    );
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutPaymentFacade.getPaymentDetails())
    );
  }
}
