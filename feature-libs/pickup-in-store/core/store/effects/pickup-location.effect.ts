import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { SetDeliveryOptionPayload } from '@spartacus/pickup-in-store/root';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PickupLocationConnector } from '../../connectors';
import * as PickupLocationActions from '../actions/pickup-location.action';

@Injectable()
export class PickupLocationEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly pickupLocationConnector: PickupLocationConnector
  ) {}

  storeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.GET_STORE_DETAILS),
      map(
        (
          action: ReturnType<typeof PickupLocationActions.GetStoreDetailsById>
        ) => action.payload
      ),
      mergeMap((storeName) =>
        this.pickupLocationConnector.getStoreDetails(storeName).pipe(
          map((storeDetails) => {
            return PickupLocationActions.SetStoreDetailsSuccess({
              payload: storeDetails,
            });
          }),
          catchError((error) => {
            return of(
              PickupLocationActions.SetStoreDetailsFailure({
                payload: normalizeHttpError(error),
              })
            );
          })
        )
      )
    )
  );

  patchDeliveryOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.SET_DELIVERY_OPTION),
      map(
        (action: ReturnType<typeof PickupLocationActions.SetDeliveryOption>) =>
          action.payload
      ),
      switchMap((setDeliveryOptionPayload: SetDeliveryOptionPayload) =>
        this.pickupLocationConnector
          .setDeliveryOption(setDeliveryOptionPayload)
          .pipe(
            map(() => {
              return PickupLocationActions.SetDeliveryOptionSuccess({
                payload: {},
              });
            })
          )
      )
    )
  );
}
