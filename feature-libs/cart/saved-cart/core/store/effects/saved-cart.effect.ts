import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Cart, CartActions, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';

@Injectable()
export class SavedCartEffects {
  @Effect()
  saveCart$: Observable<
    | SavedCartActions.SaveCartFail
    | SavedCartActions.SaveCartSuccess
    | SavedCartActions.SaveCart
    | CartActions.LoadCartSuccess
  > = this.actions$.pipe(
    ofType(SavedCartActions.SAVE_CART),
    map((action: SavedCartActions.SaveCart) => action.payload),
    switchMap(
      ({ userId, cartId, saveCartName, saveCartDescription, extraData }) => {
        return this.savedCartConnector
          .saveCart(userId, cartId, saveCartName, saveCartDescription)
          .pipe(
            switchMap((savedCart: Cart) => {
              if (extraData?.edit) {
                return [
                  new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                  }),
                  new SavedCartActions.SaveCartSuccess(),
                ];
              } else {
                // TODO: Michal to put logic for saving his cart from cart page
                // remove snippet below
                // might be the same thing, therefore can remove the extra data
                // will think more about it
                return [
                  new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                  }),
                  new SavedCartActions.SaveCartSuccess(),
                ];
              }
            }),
            catchError((error: HttpErrorResponse) =>
              of(new SavedCartActions.SaveCartFail(normalizeHttpError(error)))
            )
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector
  ) {}
}

// saveCart$: Observable<
//     | SavedCartActions.SaveCartSuccess
//     | SavedCartActions.SaveCartFail
//     | CartActions.ClearCartState
//   > = this.actions$.pipe(
//     ofType(SavedCartActions.SAVE_CART),
//     map((action: SavedCartActions.SaveCart) => action.payload),
//     filter((payload) => payload.userId !== OCC_USER_ID_ANONYMOUS),
//     switchMap(({ userId, cartId, cartDescription, cartName }) => {
//       return this.savedCartConnector
//         .saveCart(userId, cartId, cartDescription, cartName)
//         .pipe(
//           switchMap((cart) => {
//             this.showSaveCartMessage(
//               'savedCartCartPage.messages.cartSaved',
//               cart
//             );
//             this.clearCheckoutService.resetCheckoutProcesses();
//             return [
//               new SavedCartActions.SaveCartSuccess({}),
//               new CartActions.ClearCartState(),
//             ];
//           }),
//           catchError((error: HttpErrorResponse) =>
//             of(
//               new SavedCartActions.SaveCartFail({
//                 error: normalizeHttpError(error),
//               })
//             )
//           )
//         );
//     })
