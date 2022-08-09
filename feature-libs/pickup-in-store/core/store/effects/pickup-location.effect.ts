import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { PatchDeliveryOptionPayload } from '@spartacus/pickup-in-store/root';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
      switchMap((storeName) =>
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
      ofType(PickupLocationActions.PATCH_DELIVERY_OPTION),
      map(
        (
          action: ReturnType<typeof PickupLocationActions.PatchDeliveryOption>
        ) => action.payload
      ),
      switchMap((patchDeliveryOptionPayload: PatchDeliveryOptionPayload) =>
        this.pickupLocationConnector
          .patchDeliveryOption(patchDeliveryOptionPayload)
          .pipe(
            map(() => {
              return PickupLocationActions.PatchDeliveryOptionSuccess({
                /*
                Todo: Need to discuss what has to be done with action.payload
                */
                payload: {},
              });
            })
          )
      )
    )
  );
}
