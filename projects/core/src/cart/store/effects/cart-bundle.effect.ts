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

  constructor(
    private actions$: Actions,
    private cartBundleConnector: CartBundleConnector
  ) {}
}
