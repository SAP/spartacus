import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartActions } from '@spartacus/core';
import { BundleConnector } from 'feature-libs/bundle/core/connectors/bundle.connector';
import { withdrawOn } from 'projects/core/src/util';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartModification } from '../../../../projects/core/src/model/cart.model';
import { SiteContextActions } from '../../../../projects/core/src/site-context/store/actions/index';
import { BundleActions } from '../actions';

@Injectable()
export class BundleEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  @Effect()
  startBundle$: Observable<
    | BundleActions.StartBundleSuccess
    | BundleActions.StartBundleFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.START_BUNDLE),
    map((action: CartActions.StartBundle) => action.payload),
    concatMap((payload) => {
      return this.bundleConnector
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
      return this.bundleConnector
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

  constructor(
    private actions$: Actions,
    private bundleConnector: BundleConnector
  ) {}
}
