import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../store/';
import * as fromCartStore from '../../cart/store';

import { ANOYMOUS_USERID, CartService } from '../../cart/services/cart.service';

@Injectable()
export class CheckoutService {
  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private cartStore: Store<fromCartStore.CartState>,
    private cartService: CartService
  ) {}

  createAndSetAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.AddDeliveryAddress({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        address: address
      })
    );
  }

  loadCartDetails() {
    this.cartService.getDetails = true;

    this.cartStore.dispatch(
      new fromCartStore.LoadCart({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        details: true
      })
    );
  }

  loadSupportedDeliveryModes() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.LoadSupportedDeliveryModes({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code
      })
    );
  }

  setDeliveryMode(mode: any) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetDeliveryMode({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        selectedModeId: mode
      })
    );
  }
}
