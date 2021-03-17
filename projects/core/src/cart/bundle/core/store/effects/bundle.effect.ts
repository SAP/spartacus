import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BundleConnector } from '../../connectors/bundle.connector';
import { CartActions } from '../../../../store/actions';
import { CartModification } from '../../../../../model/cart.model';
import { SiteContextActions } from '../../../../../site-context/store/actions';
import { withdrawOn } from '../../../../../util/rxjs/withdraw-on';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
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
    ofType(BundleActions.START_BUNDLE),
    map((action: BundleActions.StartBundle) => action.payload),
    concatMap((payload) => {
      return this.bundleConnector
        .bundleStart(payload.userId, payload.cartId, payload.bundleStarter)
        .pipe(
          map(
            (cartModification: CartModification) =>
              new BundleActions.StartBundleSuccess({
                ...payload,
                ...(cartModification as Required<CartModification>),
              })
          ),
          catchError((error) =>
            from([
              new BundleActions.StartBundleFail({
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
    | BundleActions.GetBundleAllowedProductsSuccess
    | BundleActions.GetBundleAllowedProductsFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(BundleActions.GET_BUNDLE_ALLOWED_PRODUCTS),
    map((action: BundleActions.GetBundleAllowedProducts) => action.payload),
    mergeMap((payload) =>
      this.bundleConnector
        .bundleAllowedProductsSearch(
          payload.userId,
          payload.cartId,
          payload.entryGroupNumber,
          payload.searchConfig
        )
        .pipe(
          map(
            (data) =>
              // (cartModification: CartModification) =>
              // TODO: Type should not be cast to "any"
              new BundleActions.GetBundleAllowedProductsSuccess(<any>{
                ...payload,
                data,
              })
          ),
          catchError((error) =>
            from([
              new BundleActions.GetBundleAllowedProductsFail({
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
    private bundleConnector: BundleConnector
  ) { }
}
