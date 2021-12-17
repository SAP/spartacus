import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  EMAIL_PATTERN,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
  PaymentDetails,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
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
    protected checkoutService: CheckoutFacade,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected activeCartService: ActiveCartService
  ) {
    this.cartId$ = combineLatest([
      this.activeCartService.getActive(),
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([, isStable]) => isStable),
      map(([cartData]) => {
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
      tap((cartId) => this.checkoutService.loadCheckoutDetails(cartId)),
      shareReplay(1),
      switchMap(() => this.checkoutService.getCheckoutDetailsLoaded()),
      skipWhile((loaded) => !loaded)
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
