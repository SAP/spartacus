import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withdrawOn } from 'projects/core/src/util';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartModification } from '../../../model/cart.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
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
    | CartActions.StartBundleSuccess
    | CartActions.StartBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.START_BUNDLE),
    map((action: CartActions.StartBundle) => action.payload),
    concatMap((payload) => {
      return this.cartBundleConnector
        .bundleStart(payload.userId, payload.cartId, payload.bundleStarter)
        .pipe(
          map(
            (cartModification: CartModification) =>
              new CartActions.StartBundleSuccess({
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new CartActions.StartBundleFail({
                ...payload,
                error: error,
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
  getBundleAllowedProducts$: Observable<
    | CartActions.GetBundleAllowedProductsSuccess
    | CartActions.GetBundleAllowedProductsFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.GET_BUNDLE_ALLOWED_PRODUCTS),
    map((action: CartActions.GetBundleAllowedProducts) => action.payload),
    concatMap((payload) => {
      return this.cartBundleConnector
        .bundleAllowedProductsSearch(
          payload.userId,
          payload.cartId,
          payload.entryGroupNumber,
          payload.searchConfig
        )
        .pipe(
          map(
            (cartModification: CartModification) =>
              // TODO: Type should not be cast to "any"
              new CartActions.GetBundleAllowedProductsSuccess(<any>{
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new CartActions.GetBundleAllowedProductsFail({
                ...payload,
                error: error,
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
  addProductToBundle$: Observable<
    | CartActions.AddProductToBundleSuccess
    | CartActions.AddProductToBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.ADD_PRODUCT_TO_BUNDLE),
    map((action: CartActions.AddProductToBundle) => action.payload),
    concatMap((payload) =>
      this.cartBundleConnector
        .bundleAddEntry(
          payload.userId,
          payload.cartId,
          payload.entryGroupNumber,
          payload.entry
        )
        .pipe(
          map((cartModification: CartModification) => {
            return new CartActions.AddProductToBundleSuccess({
              ...payload,
              ...(cartModification as Required<CartModification>),
            });
          }),
          catchError((error) =>
            from([
              new CartActions.AddProductToBundleFail({
                ...payload,
                error: error,
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
  removeBundle$: Observable<
    | CartActions.RemoveBundleSuccess
    | CartActions.RemoveBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.REMOVE_BUNDLE),
    map((action: CartActions.RemoveBundle) => action.payload),
    concatMap((payload) =>
      this.cartBundleConnector
        .bundleDelete(payload.userId, payload.cartId, payload.entryGroupNumber)
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
                error: error,
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
