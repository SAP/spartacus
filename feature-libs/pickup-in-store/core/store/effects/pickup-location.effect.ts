/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PickupLocationConnector } from '../../connectors';
import * as PickupLocationActions from '../actions/pickup-location.action';

@Injectable()
export class PickupLocationEffect {
  protected logger = inject(LoggerService);

  constructor(
    private actions$: Actions,
    private pickupLocationConnector: PickupLocationConnector
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
          map((storeDetails) =>
            PickupLocationActions.SetStoreDetailsSuccess({
              payload: storeDetails,
            })
          ),
          catchError((error) =>
            of(
              PickupLocationActions.SetStoreDetailsFailure({
                error: tryNormalizeHttpError(error, this.logger),
              })
            )
          )
        )
      )
    )
  );
}
