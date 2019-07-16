import { Injectable } from '@angular/core';
import {
  Address,
  CartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CheckoutService,
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
      switchMap(() => this.checkoutDeliveryService.getDeliveryAddress())
    );
  }

  private getSelectedDeliveryModeCode(): Observable<string> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() =>
        this.checkoutDeliveryService.getSelectedDeliveryModeCode()
      )
    );
  }

  getSomeNewData(): string {
    this.getSelectedDeliveryModeCode();
    return 'test';
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return this.getCheckoutDetailsLoaded$.pipe(
      switchMap(() => this.checkoutPaymentService.getPaymentDetails())
    );
  }
}
