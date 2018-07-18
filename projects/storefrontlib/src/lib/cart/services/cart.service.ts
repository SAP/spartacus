import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';
import * as fromUser from '../../user/store';

import { ANONYMOUS_USERID, CartDataService } from './cartData.service';

@Injectable()
export class CartService {
  callback: Function;

  constructor(
    private store: Store<fromReducer.CartState>,
    private cartData: CartDataService
  ) {
    this.initCart();
  }

  initCart() {
    this.store.select(fromSelector.getActiveCart).subscribe(cart => {
      this.cartData.cart = cart;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.store
      .select(fromUser.getUserToken)
      .pipe(filter(userToken => this.cartData.userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this.cartData.userId = userToken.userId;
        } else {
          this.cartData.userId = ANONYMOUS_USERID;
        }

        // for login user, whenever there's an existing cart,
        // we will load the user current cart and merge it into the existing cart
        if (this.cartData.userId !== ANONYMOUS_USERID) {
          if (Object.keys(this.cartData.cart).length === 0) {
            this.store.dispatch(
              new fromAction.LoadCart({
                userId: this.cartData.userId,
                cartId: 'current'
              })
            );
          } else {
            this.store.dispatch(
              new fromAction.MergeCart({
                userId: this.cartData.userId,
                cartId: this.cartData.cart.guid
              })
            );
          }
        }
      });

    this.store.select(fromSelector.getRefresh).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadCart({
            userId: this.cartData.userId,
            cartId: this.cartData.cartId,
            details: true
          })
        );
      }
    });
  }

  loadCartDetails() {
    this.cartData.getDetails = true;

    this.store.dispatch(
      new fromAction.LoadCart({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        details: true
      })
    );
  }

  addCartEntry(productCode: string, quantity: number) {
    if (Object.keys(this.cartData.cart).length === 0) {
      this.store.dispatch(
        new fromAction.CreateCart({ userId: this.cartData.userId })
      );
      this.callback = function() {
        this.store.dispatch(
          new fromAction.AddEntry({
            userId: this.cartData.userId,
            cartId: this.cartData.cartId,
            productCode: productCode,
            quantity: quantity
          })
        );
      };
    } else {
      this.store.dispatch(
        new fromAction.AddEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          productCode: productCode,
          quantity: quantity
        })
      );
    }
  }

  removeCartEntry(entry) {
    this.store.dispatch(
      new fromAction.RemoveEntry({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        entry: entry.entryNumber
      })
    );
  }

  updateCartEntry(entryNumber: string, quantity: number) {
    if (+quantity > 0) {
      this.store.dispatch(
        new fromAction.UpdateEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          entry: entryNumber,
          qty: quantity
        })
      );
    } else {
      this.store.dispatch(
        new fromAction.RemoveEntry({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          entry: entryNumber
        })
      );
    }
  }
}
