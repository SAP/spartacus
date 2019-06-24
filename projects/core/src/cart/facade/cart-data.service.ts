import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { Cart } from '../../model/cart.model';
import { StateWithCart } from '../store/cart-state';
import { CartSelectors } from '../store/selectors/index';

export const ANONYMOUS_USERID = 'anonymous';

@Injectable()
export class CartDataService {
  private _userId = ANONYMOUS_USERID;
  private _cart: Cart;

  constructor(
    protected store: Store<StateWithCart>,
    protected authService: AuthService
  ) {
    this.authService
      .getUserToken()
      .pipe(filter(userToken => this.userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this._userId = userToken.userId;
        } else {
          this._userId = ANONYMOUS_USERID;
        }
      });

    this.store.pipe(select(CartSelectors.getCartContent)).subscribe(cart => {
      this._cart = cart;
    });
  }

  get hasCart(): boolean {
    return !!this._cart;
  }

  get userId(): string {
    return this._userId;
  }

  get cart(): Cart {
    return this._cart;
  }

  get cartId(): string {
    if (this.hasCart) {
      return this.userId === ANONYMOUS_USERID ? this.cart.guid : this.cart.code;
    }
  }
}
