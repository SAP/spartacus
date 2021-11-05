import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CartType } from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isSelectiveCart } from '../../utils/utils';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  @Effect()
  setTempCart$ = this.actions$.pipe(
    ofType(CartActions.SET_TEMP_CART),
    map((action: CartActions.SetTempCart) => {
      return new CartActions.RemoveCart({ cartId: action.payload.tempCartId });
    })
  );

  // TODO(#7241): Remove when we drop ADD_VOUCHER process and we sort out checkout and cart dependencies
  @Effect()
  processesIncrement$: Observable<CartActions.CartProcessesIncrement> = this.actions$.pipe(
    ofType(CartActions.CART_ADD_VOUCHER),
    map((action: CartActions.CartAddVoucher) => action.payload),
    map((payload) => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  @Effect()
  setSelectiveId$: Observable<CartActions.SetCartTypeIndex | undefined> =
    this.actions$.pipe(
      ofType(CartActions.LOAD_CART_SUCCESS, CartActions.CLEAR_CART_STATE),
      map((action: Action) => {
        switch (action.type) {
          case CartActions.LOAD_CART_SUCCESS: {
            const payload = (action as CartActions.LoadCartSuccess).payload;
            if (isSelectiveCart(payload.cartId)) {
              return new CartActions.SetCartTypeIndex({
                cartType: CartType.SELECTIVE,
                cartId: payload.cartId,
              });
            }
          }
          case CartActions.CLEAR_CART_STATE:
            return new CartActions.SetCartTypeIndex({
              cartType: CartType.SELECTIVE,
              cartId: undefined,
            });
        }
      })
    );

  constructor(private actions$: Actions) {}
}
