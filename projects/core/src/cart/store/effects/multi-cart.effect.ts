import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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

  constructor(private actions$: Actions) {}
}
