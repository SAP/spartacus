import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';

import { ProductImageConverterService } from '../../../product/index';
import { CURRENCY_CHANGE, LANGUAGE_CHANGE } from '../../../site-context/index';
import * as fromActions from './../actions/cart.action';
import { CartDataService } from '../../facade/cart-data.service';
import { OccCartService } from '../../occ/cart.service';
import { Cart } from '../../../occ/occ-models/occ.models';
import {
  SetDeliveryAddress,
  SetDeliveryMode,
  SetPaymentDetails,
} from 'projects/core/src/checkout/store/actions';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<
    fromActions.LoadCartFail | fromActions.LoadCartSuccess
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CART, LANGUAGE_CHANGE, CURRENCY_CHANGE),
    map(
      (action: {
        type: string;
        payload?: { userId: string; cartId: string; details?: boolean };
      }) => action.payload
    ),
    mergeMap(payload => {
      const loadCartParams = {
        userId: (payload && payload.userId) || this.cartData.userId,
        cartId: (payload && payload.cartId) || this.cartData.cartId,
        details:
          payload && payload.details !== undefined
            ? payload.details
            : this.cartData.getDetails,
      };

      if (this.isMissingData(loadCartParams)) {
        return of(new fromActions.LoadCartFail({}));
      }

      return this.occCartService
        .loadCart(
          loadCartParams.userId,
          loadCartParams.cartId,
          loadCartParams.details
        )
        .pipe(
          map((cart: Cart) => {
            if (cart && cart.entries) {
              for (const entry of cart.entries) {
                this.productImageConverter.convertProduct(entry.product);
              }
            }
            return new fromActions.LoadCartSuccess(cart);
          }),
          catchError(error => of(new fromActions.LoadCartFail(error)))
        );
    })
  );
  @Effect()
  loadDeliveryAddress = this.actions$.pipe(
    ofType(fromActions.LOAD_CART_SUCCESS),
    filter(
      (action: fromActions.LoadCartSuccess) => action.payload.deliveryAddress
    ),
    withLatestFrom(this.actions$.pipe(ofType(fromActions.LOAD_CART))),
    map(
      ([loadCartSuccess, loadCart]: [
        fromActions.LoadCartSuccess,
        fromActions.LoadCart
      ]) => {
        return new SetDeliveryAddress({
          userId: loadCart.payload.userId,
          cartId: loadCart.payload.cartId,
          address: loadCartSuccess.payload.deliveryAddress,
        });
      }
    )
  );
  @Effect()
  loadDeliveryMode = this.actions$.pipe(
    ofType(fromActions.LOAD_CART_SUCCESS),
    filter(
      (action: fromActions.LoadCartSuccess) => action.payload.deliveryMode
    ),
    withLatestFrom(this.actions$.pipe(ofType(fromActions.LOAD_CART))),
    map(
      ([loadCartSuccess, loadCart]: [
        fromActions.LoadCartSuccess,
        fromActions.LoadCart
      ]) => {
        return new SetDeliveryMode({
          userId: loadCart.payload.userId,
          cartId: loadCart.payload.cartId,
          selectedModeId: loadCartSuccess.payload.deliveryMode.code,
        });
      }
    )
  );
  @Effect()
  loadPaymentMethod = this.actions$.pipe(
    ofType(fromActions.LOAD_CART_SUCCESS),
    filter((action: fromActions.LoadCartSuccess) => action.payload.paymentInfo),
    withLatestFrom(this.actions$.pipe(ofType(fromActions.LOAD_CART))),
    map(
      ([loadCartSuccess, loadCart]: [
        fromActions.LoadCartSuccess,
        fromActions.LoadCart
      ]) => {
        return new SetPaymentDetails({
          userId: loadCart.payload.userId,
          cartId: loadCart.payload.cartId,
          paymentDetails: loadCartSuccess.payload.paymentInfo,
        });
      }
    )
  );

  @Effect()
  createCart$: Observable<
    | fromActions.MergeCartSuccess
    | fromActions.CreateCartSuccess
    | fromActions.CreateCartFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_CART),
    map((action: fromActions.CreateCart) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .createCart(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: Cart) => {
            if (cart.entries) {
              for (const entry of cart.entries) {
                this.productImageConverter.convertProduct(entry.product);
              }
            }
            if (payload.oldCartId) {
              return [
                new fromActions.CreateCartSuccess(cart),
                new fromActions.MergeCartSuccess(),
              ];
            }
            return [new fromActions.CreateCartSuccess(cart)];
          }),
          catchError(error => of(new fromActions.CreateCartFail(error)))
        );
    })
  );

  @Effect()
  mergeCart$: Observable<fromActions.CreateCart> = this.actions$.pipe(
    ofType(fromActions.MERGE_CART),
    map((action: fromActions.MergeCart) => action.payload),
    mergeMap(payload => {
      return this.occCartService.loadCart(payload.userId, 'current').pipe(
        map(currentCart => {
          return new fromActions.CreateCart({
            userId: payload.userId,
            oldCartId: payload.cartId,
            toMergeCartGuid: currentCart ? currentCart.guid : undefined,
          });
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private productImageConverter: ProductImageConverterService,
    private occCartService: OccCartService,
    private cartData: CartDataService
  ) {}

  private isMissingData(payload) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
