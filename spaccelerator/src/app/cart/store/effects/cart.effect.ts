import { Injectable } from '@angular/core';

import * as fromActions from './../actions/cart.action';

import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';
import { ProductImageConverterService } from '../../../product/converters';
import { CartService } from '../../services/cart.service';
import { ANOYMOUS_USERID } from '../../services/cart.service';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<any> = this.actions$
    .ofType(
      fromActions.LOAD_CART,
      '[Site-context] Language Change',
      '[Site-context] Currency Change'
    )
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
            userId: this.cartService.userId,
            cartId:
              this.cartService.userId === ANOYMOUS_USERID
                ? this.cartService.cart.guid
                : this.cartService.cart.code,
            details: this.cartService.getDetails ? true : undefined
          };
        }
        if (payload.userId === undefined || payload.cartId === undefined) {
          return of(new fromActions.LoadCartFail({}));
        }

        return this.occCartService
          .loadCart(payload.userId, payload.cartId, payload.details)
          .pipe(
            map((cart: any) => {
              if (cart.entries) {
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
  createCart$: Observable<any> = this.actions$
    .ofType(fromActions.CREATE_CART)
    .pipe(
      map((action: fromActions.CreateCart) => action.payload),
      mergeMap(payload => {
        return this.occCartService
          .createCart(
            payload.userId,
            payload.oldCartId,
            payload.toMergeCartGuid
          )
          .pipe(
            map((cart: any) => {
              if (cart.entries) {
                for (const entry of cart.entries) {
                  this.productImageConverter.convertProduct(entry.product);
                }
              }
              return new fromActions.CreateCartSuccess(cart);
            }),
            catchError(error => of(new fromActions.CreateCartFail(error)))
          );
      })
    );

  @Effect()
  mergeCart$: Observable<any> = this.actions$
    .ofType(fromActions.MERGE_CART)
    .pipe(
      map((action: fromActions.MergeCart) => action.payload),
      mergeMap(payload => {
        return this.occCartService.loadCart(payload.userId, 'current').pipe(
          map(currentCart => {
            return new fromActions.CreateCart({
              userId: payload.userId,
              oldCartId: payload.cartId,
              toMergeCartGuid: currentCart.guid
            });
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private productImageConverter: ProductImageConverterService,
    private occCartService: OccCartService,
    private cartService: CartService
  ) {}
}
