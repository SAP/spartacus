import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  CartActions,
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { ClearCheckoutService } from 'projects/core/src/checkout/services/clear-checkout.service';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SavedCartConnector } from '../../connectors/saved-cart.connector';
import { SavedCartActions } from '../actions/index';

@Injectable()
export class SavedCartEffects {
  @Effect()
  saveCart$: Observable<
    | SavedCartActions.SaveCartSuccess
    | SavedCartActions.SaveCartFail
    | CartActions.ClearCartState
  > = this.actions$.pipe(
    ofType(SavedCartActions.SAVE_CART),
    map((action: SavedCartActions.SaveCart) => action.payload),
    filter((payload) => payload.userId !== OCC_USER_ID_ANONYMOUS),
    switchMap(({ userId, cartId, cartDescription, cartName }) => {
      return this.savedCartConnector
        .create(userId, cartId, cartDescription, cartName)
        .pipe(
          switchMap((cart) => {
            this.showSaveCartMessage(
              'savedCartCartPage.messages.cartSaved',
              cart
            );
            this.clearCheckoutService.resetCheckoutProcesses();
            return [
              new SavedCartActions.SaveCartSuccess({}),
              new CartActions.ClearCartState(),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              new SavedCartActions.SaveCartFail({
                error: normalizeHttpError(error),
              })
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private savedCartConnector: SavedCartConnector,
    private globalMessageService: GlobalMessageService,
    private clearCheckoutService: ClearCheckoutService
  ) {}

  private showSaveCartMessage(text: string, cart: any) {
    this.globalMessageService.add(
      { key: text, params: { cartName: cart.savedCartData.name } },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      5000
    );
  }
}
