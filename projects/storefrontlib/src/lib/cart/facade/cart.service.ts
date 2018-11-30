import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Cart, OrderEntry } from '@spartacus/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService, UserToken } from '../../auth/index';

import { ANONYMOUS_USERID, CartDataService } from './cart-data.service';

@Injectable()
export class CartService {
  private callback: Function;

  readonly activeCart$: Observable<Cart> = this.store.pipe(
    select(fromSelector.getActiveCart)
  );

  readonly entries$: Observable<OrderEntry[]> = this.store.pipe(
    select(fromSelector.getEntries)
  );

  readonly cartMergeComplete$: Observable<boolean> = this.store.pipe(
    select(fromSelector.getCartMergeComplete)
  );

  readonly loaded$: Observable<boolean> = this.store.pipe(
    select(fromSelector.getLoaded)
  );

  constructor(
    private store: Store<fromReducer.CartState>,
    private cartData: CartDataService,
    private authService: AuthService
  ) {
    this.initCart();
  }

  private initCart() {
    this.store.pipe(select(fromSelector.getActiveCart)).subscribe(cart => {
      this.cartData.cart = cart;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.authService
      .getUserToken()
      .pipe(filter(userToken => this.cartData.userId !== userToken.userId))
      .subscribe(userToken => {
        this.setUserId(userToken);
        this.loadOrMergeCart();
      });

    this.refreshCart();
  }

  private setUserId(userToken: UserToken): void {
    if (Object.keys(userToken).length !== 0) {
      this.cartData.userId = userToken.userId;
    } else {
      this.cartData.userId = ANONYMOUS_USERID;
    }
  }

  private loadOrMergeCart(): void {
    // for login user, whenever there's an existing cart, we will load the user
    // current cart and merge it into the existing cart
    if (this.cartData.userId !== ANONYMOUS_USERID) {
      if (!this.isCartCreated(this.cartData.cart)) {
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
  }

  private refreshCart(): void {
    this.store.pipe(select(fromSelector.getRefresh)).subscribe(refresh => {
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

    if (this.cartData.userId !== ANONYMOUS_USERID) {
      this.store.dispatch(
        new fromAction.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId ? this.cartData.cartId : 'current',
          details: true
        })
      );
    } else if (this.cartData.cartId) {
      this.store.dispatch(
        new fromAction.LoadCart({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          details: true
        })
      );
    }
  }

  addCartEntry(productCode: string, quantity: number) {
    if (!this.isCartCreated(this.cartData.cart)) {
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

  removeCartEntry(entry: OrderEntry) {
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

  getEntry(productCode: string): Observable<OrderEntry> {
    return this.store.pipe(
      select(fromSelector.getEntrySelectorFactory(productCode))
    );
  }

  isCartCreated(cart: Cart): boolean {
    return cart && !!Object.keys(cart).length;
  }

  isCartEmpty(cart: Cart): boolean {
    return cart && !cart.totalItems;
  }
}
