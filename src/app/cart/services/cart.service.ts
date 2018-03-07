import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromAuth from '../../auth/store';

const ANOYMOUS_USERID = 'anonymous';

@Injectable()
export class CartService {
  userId = ANOYMOUS_USERID;
  cart: any;
  callback: Function;

  constructor(private store: Store<fromStore.CartState>) {
    this.initCart();
  }

  initCart() {
    this.store.select(fromStore.getActiveCart).subscribe(cart => {
      this.cart = cart;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.store.select(fromAuth.getUserToken).subscribe(userToken => {
      if (Object.keys(userToken).length !== 0) {
        this.userId = userToken.userId;
      } else {
        this.userId = ANOYMOUS_USERID;
      }

      // for login user, whenever there's an existing cart,
      // we will load the user current cart and merge it into the existing cart
      if (this.userId !== ANOYMOUS_USERID) {
        if (Object.keys(this.cart).length === 0) {
          this.store.dispatch(
            new fromStore.LoadCart({ userId: this.userId, cartId: 'current' })
          );
        } else {
          this.store.dispatch(
            new fromStore.MergeCart({
              userId: this.userId,
              cartId: this.cart.guid
            })
          );
        }
      }
    });

    this.store.select(fromStore.getRefresh).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromStore.LoadCart({
            userId: this.userId,
            cartId:
              this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code
          })
        );
      }
    });
  }

  addCartEntry(productCode: string, quantity: number) {
    if (Object.keys(this.cart).length === 0) {
      this.store.dispatch(new fromStore.CreateCart({ userId: this.userId }));
      this.callback = function() {
        this.store.dispatch(
          new fromStore.AddEntry({
            userId: this.userId,
            cartId:
              this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
            productCode: productCode,
            quantity: quantity
          })
        );
      };
    } else {
      this.store.dispatch(
        new fromStore.AddEntry({
          userId: this.userId,
          cartId:
            this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
          productCode: productCode,
          quantity: quantity
        })
      );
    }
  }

  removeCartEntry(entry) {
    this.store.dispatch(
      new fromStore.RemoveEntry({
        userId: this.userId,
        cartId:
          this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
        entry: entry.entryNumber
      })
    );
  }
}
