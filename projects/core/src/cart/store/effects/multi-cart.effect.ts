import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  setTempCart$ = this.actions$.pipe(
    ofType(CartActions.SET_TEMP_CART),
    map((action: CartActions.SetTempCart) => {
      return new CartActions.RemoveTempCart(action.payload);
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
    map(payload => new CartActions.RemoveCart(payload.cartId))
  );

  // TODO: Change actions to extend Increment action instead of doing extra dispatch in this effect
  // Change for 2.0 release
  @Effect()
  processesIncrement$: Observable<
    CartActions.CartProcessesIncrement
  > = this.actions$.pipe(
    ofType(
      CartActions.CART_ADD_ENTRY,
      CartActions.CART_UPDATE_ENTRY,
      CartActions.CART_REMOVE_ENTRY,
      DeprecatedCartActions.ADD_EMAIL_TO_CART,
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE,
      CartActions.CART_ADD_VOUCHER,
      CartActions.CART_REMOVE_VOUCHER
    ),
    map(
      (
        action:
          | CartActions.CartAddEntry
          | CartActions.CartUpdateEntry
          | CartActions.CartRemoveEntry
          | DeprecatedCartActions.AddEmailToCart
          | CheckoutActions.ClearCheckoutDeliveryMode
          | CartActions.CartAddVoucher
          | CartActions.CartRemoveVoucher
      ) => action.payload
    ),
    map(payload => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  constructor(private actions$: Actions) {}
}
