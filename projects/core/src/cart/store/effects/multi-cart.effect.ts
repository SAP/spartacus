import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CheckoutActions } from '../../../checkout/store/actions';
import * as DeprecatedCartActions from '../actions/cart.action';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  @Effect()
  loadCart2$: Observable<CartActions.LoadMultiCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.LOAD_CART),
    map(
      (action: DeprecatedCartActions.LoadCart) =>
        new CartActions.LoadMultiCart(action.payload)
    )
  );

  @Effect()
  createCart2$: Observable<CartActions.CreateMultiCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.CREATE_CART),
    map(
      (action: CartActions.CreateCart) =>
        new CartActions.CreateMultiCart(action.payload)
    )
  );

  @Effect()
  setFreshCart$ = this.actions$.pipe(
    ofType(CartActions.SET_FRESH_CART),
    map(() => {
      return new CartActions.ResetFreshCart();
    })
  );

  @Effect()
  mergeCart2$: Observable<CartActions.MergeMultiCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.MERGE_CART),
    map(
      (action: DeprecatedCartActions.MergeCart) =>
        new CartActions.MergeMultiCart(action.payload)
    )
  );

  @Effect()
  addEmail2$: Observable<CartActions.AddEmailToMultiCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.ADD_EMAIL_TO_CART),
    map(
      (action: CartActions.AddEmailToCart) =>
        new CartActions.AddEmailToMultiCart(action.payload)
    )
  );

  @Effect()
  removeCart$: Observable<CartActions.RemoveCart> = this.actions$.pipe(
    ofType(DeprecatedCartActions.DELETE_CART),
    map((action: DeprecatedCartActions.DeleteCart) => action.payload),
    mergeMap(payload => [new CartActions.RemoveCart(payload.cartId)])
  );

  @Effect()
  queueAction$: Observable<
    CartActions.CartProcessesIncrementAction
  > = this.actions$.pipe(
    ofType(
      DeprecatedCartActions.MERGE_CART,
      CartActions.CART_ADD_ENTRY,
      CartActions.CART_UPDATE_ENTRY,
      CartActions.CART_REMOVE_ENTRY,
      DeprecatedCartActions.ADD_EMAIL_TO_CART,
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE,
      CartActions.CART_REMOVE_ENTRY,
      CartActions.CART_ADD_VOUCHER,
      CartActions.CART_REMOVE_VOUCHER
    ),
    map(
      (
        action:
          | DeprecatedCartActions.MergeCart
          | CartActions.CartAddEntry
          | CartActions.CartUpdateEntry
          | CartActions.CartRemoveEntry
          | DeprecatedCartActions.AddEmailToCart
          | CheckoutActions.ClearCheckoutDeliveryMode
          | CartActions.CartAddVoucher
          | CartActions.CartRemoveVoucher
      ) => action.payload
    ),
    map(
      payload =>
        payload && new CartActions.CartProcessesIncrementAction(payload.cartId)
    )
  );

  constructor(private actions$: Actions) {}
}
