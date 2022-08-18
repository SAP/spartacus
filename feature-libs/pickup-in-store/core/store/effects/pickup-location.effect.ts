/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PickupLocationConnector } from '../../connectors';
import * as PickupLocationActions from '../actions/pickup-location.action';

@Injectable()
export class PickupLocationEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly pickupLocationConnector: PickupLocationConnector
  ) {
    // Intentional empty constructor
  }

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

  setPickupOptionDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.SET_PICKUP_OPTION_DELIVERY),
      map(
        (
          action: ReturnType<
            typeof PickupLocationActions.SetPickupOptionDelivery
          >
        ) => action.payload
      ),
      switchMap(({ cartId, entryNumber, userId, requestPayload }) =>
        this.pickupLocationConnector
          .setPickupOptionDelivery(cartId, entryNumber, userId, requestPayload)
          .pipe(
            map(() => {
              return PickupLocationActions.SetPickupOptionDeliverySuccess({
                payload: {},
              });
            })
          )
      )
    )
  );

  setPickupOptionInStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupLocationActions.SET_PICKUP_OPTION_IN_STORE),
      map(
        (
          action: ReturnType<
            typeof PickupLocationActions.SetPickupOptionInStore
          >
        ) => action.payload
      ),
      switchMap(({ cartId, entryNumber, userId, requestPayload }) =>
        this.pickupLocationConnector
          .setPickupOptionInStore(cartId, entryNumber, userId, requestPayload)
          .pipe(
            map(() => {
              return PickupLocationActions.SetPickupOptionInStoreSuccess({
                payload: {},
              });
            })
          )
      )
    )
  );
}
