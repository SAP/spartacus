import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartModification } from '../../../model/cart.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { withdrawOn } from '../../../util/withdraw-on';
import { CartBundleConnector } from '../../connectors/bundle/index';
import { CartActions } from '../actions/index';

@Injectable()
export class CartBundleEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  @Effect()
  startBundle$: Observable<
    | CartActions.CreateBundleSuccess
    | CartActions.CreateBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_BUNDLE),
    map((action: CartActions.CreateBundle) => action.payload),
    concatMap((payload) => {
      return this.cartBundleConnector
        .start(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity,
          payload.templateId
        )
        .pipe(
          map(
            (cartModification: CartModification) =>
              new CartActions.CreateBundleSuccess({
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new CartActions.CreateBundleFail({
                ...payload,
                error: makeErrorSerializable(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  getBundles$: Observable<
    | CartActions.GetBundlesSuccess
    | CartActions.GetBundlesFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.GET_BUNDLES),
    map((action: CartActions.GetBundles) => action.payload),
    concatMap((payload) => {
      return this.cartBundleConnector
        .getAll(payload.userId, payload.cartId)
        .pipe(
          map(
            (cartModification: CartModification) =>
              new CartActions.GetBundlesSuccess({
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new CartActions.GetBundlesFail({
                ...payload,
                error: makeErrorSerializable(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  removeBundle$: Observable<
    | CartActions.RemoveBundleSuccess
    | CartActions.RemoveBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.REMOVE_BUNDLE),
    map((action: CartActions.RemoveBundle) => action.payload),
    concatMap((payload) =>
      this.cartBundleConnector
        .remove(payload.userId, payload.cartId, payload.entryGroupId)
        .pipe(
          map(() => {
            return new CartActions.RemoveBundleSuccess({
              ...payload,
            });
          }),
          catchError((error) =>
            from([
              new CartActions.RemoveBundleFail({
                ...payload,
                error: makeErrorSerializable(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    ),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  updateBundle$: Observable<
    | CartActions.UpdateBundleSuccess
    | CartActions.UpdateBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.UPDATE_BUNDLE),
    map((action: CartActions.UpdateBundle) => action.payload),
    concatMap((payload) =>
      this.cartBundleConnector
        .update(
          payload.userId,
          payload.cartId,
          payload.entryGroupId,
          payload.product,
          payload.quantity
        )
        .pipe(
          map(() => {
            return new CartActions.UpdateBundleSuccess({
              ...payload,
            });
          }),
          catchError((error) =>
            from([
              new CartActions.UpdateBundleFail({
                ...payload,
                error: makeErrorSerializable(error),
              }),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        )
    ),
    withdrawOn(this.contextChange$)
  );

  constructor(
    private actions$: Actions,
    private cartBundleConnector: CartBundleConnector
  ) {}
}
