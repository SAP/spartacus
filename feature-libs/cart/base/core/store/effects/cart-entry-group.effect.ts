import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartModification } from '@spartacus/cart/base/root';
import { SiteContextActions, withdrawOn } from '@spartacus/core';
import { CartEntryGroupConnector } from '../../connectors/entry-group';
import { CartActions } from '../actions/index';

@Injectable()
export class CartEntryGroupEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  addToEntryGroup$: Observable<
    | CartActions.AddToEntryGroupSuccess
    | CartActions.AddToEntryGroupFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.ADD_TO_ENTRY_GROUP),
    map((action: CartActions.AddToEntryGroup) => action.payload),
    concatMap((payload) =>
      this.cartEntryGroupConnector
        .addToEntryGroup(
          payload.userId,
          payload.cartId,
          payload.entryGroupNumber,
          payload.entry
        )
        .pipe(
          map((cartModification: CartModification) => {
            return new CartActions.AddToEntryGroupSuccess({
              ...payload,
              ...(cartModification as Required<CartModification>),
            });
          }),
          catchError((error) =>
            from([
              new CartActions.AddToEntryGroupFail({
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

  addEntriesToEntryGroups$: Observable<
    | CartActions.AddEntriesToEntryGroupsSuccess
    | CartActions.AddEntriesToEntryGroupsFail
    | CartActions.LoadCart
    | CartActions.MergeCart
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.ADD_ENTRIES_TO_ENTRY_GROUPS),
      map((action: CartActions.AddEntriesToEntryGroups) => action.payload),
      concatMap((payload) =>
        from(payload.entries)
          .pipe(
            concatMap((item) =>
              this.cartEntryGroupConnector.addToEntryGroup(
                payload.userId,
                payload.cartId,
                item.entryGroupNumber,
                item.entry
              )
            ),
            toArray()
          )
          .pipe(
            mergeMap((cartModifications: CartModification[]) => {
              // const pseudoUuid = Math.random().toString(36).substr(2, 9);
              return [
                new CartActions.AddEntriesToEntryGroupsSuccess({
                  ...payload,
                  statuses: cartModifications as Required<CartModification>[],
                }),
                // new CartActions.MergeCart({
                //   userId: payload.userId,
                //   cartId: payload.cartId,
                //   tempCartId: pseudoUuid,
                // }),
              ];
            }),
            catchError((error) =>
              from([
                new CartActions.AddEntriesToEntryGroupsFail({
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
    )
  );
  deleteEntryGroup$: Observable<
    | CartActions.DeleteEntryGroupSuccess
    | CartActions.DeleteEntryGroupFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CartActions.DELETE_ENTRY_GROUP),
    map((action: CartActions.DeleteEntryGroup) => action.payload),
    concatMap((payload) =>
      this.cartEntryGroupConnector
        .deleteEntryGroup(
          payload.userId,
          payload.cartId,
          payload.entryGroupNumber
        )
        .pipe(
          map(() => {
            return new CartActions.DeleteEntryGroupSuccess({
              ...payload,
            });
          }),
          catchError((error) =>
            from([
              new CartActions.DeleteEntryGroupFail({
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
    private cartEntryGroupConnector: CartEntryGroupConnector
  ) {}
}
