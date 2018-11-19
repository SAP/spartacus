import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { OccCartService } from '../../../occ/cart/cart.service';
import { ProductImageConverterService } from '@spartacus/core';
import { CartDataService } from '../../services/cart-data.service';
import * as fromActions from './../actions/cart.action';
import { LANGUAGE_CHANGE, CURRENCY_CHANGE } from '@spartacus/core';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CART, LANGUAGE_CHANGE, CURRENCY_CHANGE),
    map((action: any) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          details: this.cartData.getDetails ? true : undefined
        };
      }

      if (this.isMissingData(payload)) {
        return of(new fromActions.LoadCartFail({}));
      }

      return this.occCartService
        .loadCart(payload.userId, payload.cartId, payload.details)
        .pipe(
          map((cart: any) => {
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
  createCart$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.CREATE_CART),
    map((action: fromActions.CreateCart) => action.payload),
    mergeMap(payload => {
      return this.occCartService
        .createCart(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: any) => {
            if (cart.entries) {
              for (const entry of cart.entries) {
                this.productImageConverter.convertProduct(entry.product);
              }
            }
            if (payload.toMergeCartGuid) {
              return [
                new fromActions.CreateCartSuccess(cart),
                new fromActions.MergeCartSuccess()
              ];
            }
            return [new fromActions.CreateCartSuccess(cart)];
          }),
          catchError(error => of(new fromActions.CreateCartFail(error)))
        );
    })
  );

  @Effect()
  mergeCart$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.MERGE_CART),
    map((action: fromActions.MergeCart) => action.payload),
    mergeMap(payload => {
      return this.occCartService.loadCart(payload.userId, 'current').pipe(
        map(currentCart => {
          return new fromActions.CreateCart({
            userId: payload.userId,
            oldCartId: payload.cartId,
            toMergeCartGuid: currentCart ? currentCart.guid : undefined
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
