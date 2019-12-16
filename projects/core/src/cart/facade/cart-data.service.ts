import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { Cart } from '../../model/cart.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
} from '../../occ/utils/occ-constants';
import { EMAIL_PATTERN } from '../../util';
import { StateWithCart } from '../store/cart-state';
import { CartSelectors } from '../store/selectors/index';

/**
 * @deprecated since version 1.4
 * Replace particular methods usage with replacements from other services
 */
@Injectable()
export class CartDataService {
  private _userId = OCC_USER_ID_ANONYMOUS;
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
          this._userId = OCC_USER_ID_ANONYMOUS;
        }
      });

    this.store.pipe(select(CartSelectors.getCartContent)).subscribe(cart => {
      this._cart = cart;
    });
  }

  get hasCart(): boolean {
    return !!this._cart && Object.keys(this._cart).length > 0;
  }

  /**
   * @deprecated since version 1.4
   * Use `getOccUserId` from `AuthService` instead
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * @deprecated since version 1.4
   * Use `getActive` from `ActiveCartService` instead
   */
  get cart(): Cart {
    return this._cart;
  }

  /**
   * @deprecated since version 1.4
   * Use `getActiveCartId` from `ActiveCartService` instead
   */
  get cartId(): string {
    if (this.hasCart) {
      return this.userId === OCC_USER_ID_ANONYMOUS
        ? this.cart.guid
        : this.cart.code;
    }
  }

  /**
   * @deprecated since version 1.4
   * Use `isGuestCart` from `ActiveCartService` instead
   */
  get isGuestCart(): boolean {
    return (
      this.cart.user &&
      (this.cart.user.name === OCC_USER_ID_GUEST ||
        this.isEmail(
          this.cart.user.uid
            .split('|')
            .slice(1)
            .join('|')
        ))
    );
  }

  private isEmail(str: string): boolean {
    if (str) {
      return str.match(EMAIL_PATTERN) ? true : false;
    }
    return false;
  }
}
