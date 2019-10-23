import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartEntryConnector } from '../../connectors/entry/cart-entry.connector';
import { CartActions } from '../actions/index';
import { CartModification } from 'projects/core/src/model';

@Injectable()
export class CartEntryEffects {
  @Effect()
  addEntry$: Observable<
    CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail
  > = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .add(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity
        )
        .pipe(
          map(
            (entry: any) =>
              new CartActions.CartAddEntrySuccess({
                ...entry,
                userId: payload.userId,
                cartId: payload.cartId,
              })
          ),
          catchError(error =>
            of(new CartActions.CartAddEntryFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  @Effect()
  addEntries$: Observable<
    | CartActions.CartAddEntriesSuccess
    | CartActions.CartAddEntriesFail
    | CartActions.CartFailAddEntryProcess
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.CART_ADD_ENTRIES),
    map((action: CartActions.CartAddEntries) => action.payload),
    mergeMap(payload => {
      const addEntry = (
        products,
        userId,
        cartId
      ): Observable<CartModification> => {
        if (products && products.length) {
          const [product, ...leftEntries] = products;
          return this.cartEntryConnector
            .add(userId, cartId, product.productCode, product.quantity)
            .pipe(
              mergeMap(() => {
                return addEntry(leftEntries, userId, cartId);
              })
            );
        }
        return of({});
      };
      return addEntry(payload.products, payload.userId, payload.cartId).pipe(
        mergeMap(() => {
          return [
            new CartActions.CartAddEntriesSuccess({}),
            new CartActions.LoadCart({
              userId: payload.userId,
              cartId: payload.cartId,
              extraData: {
                addEntries: true,
              },
            }),
          ];
        }),
        catchError(error =>
          from([
            new CartActions.CartAddEntriesFail(makeErrorSerializable(error)),
            new CartActions.CartFailAddEntryProcess(),
          ])
        )
      );
    })
  );

  @Effect()
  removeEntry$: Observable<
    CartActions.CartRemoveEntrySuccess | CartActions.CartRemoveEntryFail
  > = this.actions$.pipe(
    ofType(CartActions.CART_REMOVE_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .remove(payload.userId, payload.cartId, payload.entry)
        .pipe(
          map(() => {
            return new CartActions.CartRemoveEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error =>
            of(
              new CartActions.CartRemoveEntryFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  @Effect()
  updateEntry$: Observable<
    CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail
  > = this.actions$.pipe(
    ofType(CartActions.CART_UPDATE_ENTRY),
    map((action: CartActions.CartAddEntry) => action.payload),
    mergeMap(payload =>
      this.cartEntryConnector
        .update(payload.userId, payload.cartId, payload.entry, payload.qty)
        .pipe(
          map(() => {
            return new CartActions.CartUpdateEntrySuccess({
              userId: payload.userId,
              cartId: payload.cartId,
            });
          }),
          catchError(error =>
            of(
              new CartActions.CartUpdateEntryFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private cartEntryConnector: CartEntryConnector
  ) {}
}
