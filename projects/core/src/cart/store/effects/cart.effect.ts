import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Cart } from '../../../model/cart.model';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { CartDataService } from '../../facade/cart-data.service';
import { CartActions } from '../actions/index';
import { CheckoutActions } from '../../../checkout/store/actions/index';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<
    | CartActions.LoadCartFail
    | CartActions.LoadCartSuccess
    | CartActions.ClearCart
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_CART),
    map(
      (action: {
        type: string;
        payload?: { userId: string; cartId: string };
      }) => action.payload
    ),
    mergeMap(payload => {
      const loadCartParams = {
        userId: (payload && payload.userId) || this.cartData.userId,
        cartId: (payload && payload.cartId) || this.cartData.cartId,
      };

      if (this.isMissingData(loadCartParams)) {
        return of(new CartActions.LoadCartFail({}));
      }
      return this.cartConnector
        .load(loadCartParams.userId, loadCartParams.cartId)
        .pipe(
          map((cart: Cart) => {
            return new CartActions.LoadCartSuccess(cart);
          }),
          catchError(error => {
            if (error && error.error && error.error.errors) {
              const cartNotFoundErrors = error.error.errors.filter(
                err => err.reason === 'notFound' || 'UnknownResourceError'
              );
              if (cartNotFoundErrors.length > 0) {
                return of(new CartActions.ClearCart());
              }
            }
            return of(
              new CartActions.LoadCartFail(makeErrorSerializable(error))
            );
          })
        );
    })
  );

  @Effect()
  createCart$: Observable<
    | CartActions.MergeCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateCartFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_CART),
    map((action: CartActions.CreateCart) => action.payload),
    mergeMap(payload => {
      return this.cartConnector
        .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: Cart) => {
            if (payload.oldCartId) {
              return [
                new CartActions.CreateCartSuccess(cart),
                new CartActions.MergeCartSuccess({
                  userId: payload.userId,
                  cartId: cart.code,
                }),
              ];
            }
            return [new CartActions.CreateCartSuccess(cart)];
          }),
          catchError(error =>
            of(new CartActions.CreateCartFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  @Effect()
  mergeCart$: Observable<CartActions.CreateCart> = this.actions$.pipe(
    ofType(CartActions.MERGE_CART),
    map((action: CartActions.MergeCart) => action.payload),
    mergeMap(payload => {
      return this.cartConnector.load(payload.userId, 'current').pipe(
        map(currentCart => {
          return new CartActions.CreateCart({
            userId: payload.userId,
            oldCartId: payload.cartId,
            toMergeCartGuid: currentCart ? currentCart.guid : undefined,
          });
        })
      );
    })
  );

  @Effect()
  refresh$: Observable<CartActions.LoadCart> = this.actions$.pipe(
    ofType(
      CartActions.MERGE_CART_SUCCESS,
      CartActions.CART_ADD_ENTRY_SUCCESS,
      CartActions.CART_UPDATE_ENTRY_SUCCESS,
      CartActions.CART_REMOVE_ENTRY_SUCCESS,
      CartActions.ADD_EMAIL_TO_CART_SUCCESS,
      CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS
    ),
    map(
      (
        action:
          | CartActions.MergeCartSuccess
          | CartActions.CartAddEntrySuccess
          | CartActions.CartUpdateEntrySuccess
          | CartActions.CartRemoveEntrySuccess
          | CartActions.AddEmailToCartSuccess
          | CheckoutActions.ClearCheckoutDeliveryModeSuccess
      ) => action.payload
    ),
    map(
      payload =>
        payload &&
        new CartActions.LoadCart({
          userId: payload.userId,
          cartId: payload.cartId,
        })
    )
  );

  @Effect()
  resetCartDetailsOnSiteContextChange$: Observable<
    CartActions.ResetCartDetails
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    map(() => new CartActions.ResetCartDetails())
  );

  @Effect()
  addEmail$: Observable<
    CartActions.AddEmailToCartSuccess | CartActions.AddEmailToCartFail
  > = this.actions$.pipe(
    ofType(CartActions.ADD_EMAIL_TO_CART),
    map((action: CartActions.AddEmailToCart) => action.payload),
    mergeMap(payload =>
      this.cartConnector
        .addEmail(payload.userId, payload.cartId, payload.email)
        .pipe(
          map(() => {
            return new CartActions.AddEmailToCartSuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error =>
            of(new CartActions.AddEmailToCartFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  @Effect()
  deleteCart$: Observable<any> = this.actions$.pipe(
    ofType(CartActions.DELETE_CART),
    map((action: CartActions.DeleteCart) => action.payload),
    exhaustMap(payload =>
      this.cartConnector.delete(payload.userId, payload.cartId).pipe(
        map(() => {
          return new CartActions.ClearCart();
        }),
        catchError(error =>
          of(new CartActions.DeleteCartFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private cartData: CartDataService
  ) {}

  private isMissingData(payload: { userId: string; cartId: string }) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
