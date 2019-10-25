import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffects {
  @Effect()
  loadCart2$: Observable<CartActions.LoadMultiCart> = this.actions$.pipe(
    ofType(CartActions.LOAD_CART),
    map(
      (action: CartActions.LoadCart) =>
        new CartActions.LoadMultiCart(action.payload)
    )
  );

  @Effect()
  createCart2$: Observable<CartActions.CreateMultiCart> = this.actions$.pipe(
    ofType(CartActions.CREATE_CART),
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
    ofType(CartActions.MERGE_CART),
    map(
      (action: CartActions.MergeCart) =>
        new CartActions.MergeMultiCart(action.payload)
    )
  );

  @Effect()
  addEmail2$: Observable<CartActions.AddEmailToMultiCart> = this.actions$.pipe(
    ofType(CartActions.ADD_EMAIL_TO_CART),
    map(
      (action: CartActions.AddEmailToCart) =>
        new CartActions.AddEmailToMultiCart(action.payload)
    )
  );

  @Effect()
  setLoading$: Observable<CartActions.SetCartLoading> = this.actions$.pipe(
    ofType(
      CartActions.MERGE_CART,
      CartActions.CART_ADD_ENTRY,
      CartActions.CART_UPDATE_ENTRY,
      CartActions.CART_REMOVE_ENTRY
    ),
    map(
      (
        action:
          | CartActions.MergeCart
          | CartActions.CartAddEntry
          | CartActions.CartUpdateEntry
          | CartActions.CartRemoveEntry
      ) => action.payload
    ),
    mergeMap(payload => [
      new CartActions.SetCartLoading({
        cartId: payload.cartId,
      }),
    ])
  );

  constructor(private actions$: Actions) {}
}
