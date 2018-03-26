import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';

import { ANOYMOUS_USERID, CartService } from '../../cart/services/cart.service';

@Injectable()
export class CheckoutService {
  constructor(
    private store: Store<fromReducer.CheckoutState>,
    private cartService: CartService
  ) {}

  createAndSetAddress(address) {
    this.store.dispatch(
      new fromAction.AddDeliveryAddress({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        address: address
      })
    );
  }
}
