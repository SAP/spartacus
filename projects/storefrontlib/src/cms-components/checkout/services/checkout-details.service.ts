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
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
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
    protected checkoutService: CheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected activeCartService: ActiveCartService
  ) {
    this.cartId$ = combineLatest([
      this.activeCartService.getActive(),
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([, isStable]) => isStable),
      map(([cartData]) => {
        if (
          (cartData.user && cartData.user.uid === OCC_USER_ID_ANONYMOUS) ||
          this.activeCartService.isGuestCart()
        ) {
          return cartData.guid as string;
        }
        return cartData.code as string;
      }),
      filter((cartId) => !!cartId)
    );

    this.getCheckoutDetailsLoaded$ = this.cartId$.pipe(
      distinctUntilChanged(),
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
