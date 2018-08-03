import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';

import * as fromAuthSelectors from '@auth/store/selectors';

export const ANOYMOUS_USERID = 'anonymous';

@Injectable()
export class CartService {
  userId = ANOYMOUS_USERID;
  cart: any;
  callback: Function;
  getDetails = false;

  constructor(private store: Store<fromReducer.CartState>) {
    this.initCart();
  }

  initCart() {
    this.store.select(fromSelector.getActiveCart).subscribe(cart => {
      this.cart = cart;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.store
      .select(fromAuthSelectors.getUserToken)
      .pipe(filter(userToken => this.userId !== userToken.userId))
      .subscribe(userToken => {
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
              new fromAction.LoadCart({
                userId: this.userId,
                cartId: 'current'
              })
            );
          } else {
            this.store.dispatch(
              new fromAction.MergeCart({
                userId: this.userId,
                cartId: this.cart.guid
              })
            );
          }
        }
      });

    this.store.select(fromSelector.getRefresh).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadCart({
            userId: this.userId,
            cartId:
              this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
            details: true
          })
        );
      }
    });
  }

  loadCartDetails() {
    this.getDetails = true;

    this.store.dispatch(
      new fromAction.LoadCart({
        userId: this.userId,
        cartId:
          this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
        details: true
      })
    );
  }

  addCartEntry(productCode: string, quantity: number) {
    if (Object.keys(this.cart).length === 0) {
      this.store.dispatch(new fromAction.CreateCart({ userId: this.userId }));
      this.callback = function() {
        this.store.dispatch(
          new fromAction.AddEntry({
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
        new fromAction.AddEntry({
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
      new fromAction.RemoveEntry({
        userId: this.userId,
        cartId:
          this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
        entry: entry.entryNumber
      })
    );
  }

  updateCartEntry(entryNumber: string, quantity: number) {
    if (+quantity > 0) {
      this.store.dispatch(
        new fromAction.UpdateEntry({
          userId: this.userId,
          cartId:
            this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
          entry: entryNumber,
          qty: quantity
        })
      );
    } else {
      this.store.dispatch(
        new fromAction.RemoveEntry({
          userId: this.userId,
          cartId:
            this.userId === ANOYMOUS_USERID ? this.cart.guid : this.cart.code,
          entry: entryNumber
        })
      );
    }
  }
}
