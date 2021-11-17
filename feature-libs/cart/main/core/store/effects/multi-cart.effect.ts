import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CartType } from '@spartacus/cart/main/root';
import { isNotUndefined } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isSelectiveCart } from '../../utils/utils';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  // TODO(#7241): Remove when we drop ADD_VOUCHER process and we sort out checkout and cart dependencies
  @Effect()
  processesIncrement$: Observable<CartActions.CartProcessesIncrement> = this.actions$.pipe(
    ofType(CartActions.CART_ADD_VOUCHER),
    map((action: CartActions.CartAddVoucher) => action.payload),
    map((payload) => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  @Effect()
  setSelectiveId$: Observable<CartActions.SetCartTypeIndex> = this.actions$.pipe(
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
          break;
        }
        case CartActions.CLEAR_CART_STATE:
          return new CartActions.SetCartTypeIndex({
            cartType: CartType.SELECTIVE,
            cartId: undefined,
          });
      }
    }),
    filter(isNotUndefined)
  );

  @Effect()
  setActiveCartId$: Observable<CartActions.SetCartTypeIndex> = this.actions$.pipe(
    ofType(
      CartActions.LOAD_CART_SUCCESS,
      CartActions.CREATE_CART_SUCCESS,
      CartActions.CREATE_CART
    ),
    map((action: any) => {
      switch (action.type) {
        case CartActions.LOAD_CART_SUCCESS:
        case CartActions.CREATE_CART_SUCCESS:
        case CartActions.CREATE_CART: {
          if (action?.payload?.extraData?.active) {
            return new CartActions.SetCartTypeIndex({
              cartType: CartType.ACTIVE,
              cartId: action.meta.entityId as string,
            });
          }
          break;
        }
      }
    }),
    filter(isNotUndefined)
  );

  constructor(private actions$: Actions) {}
}
