/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { iif, of, throwError } from 'rxjs';

import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DefaultPointOfServiceActions } from '../actions/index';

@Injectable()
export class DefaultPointOfServiceEffect {
  constructor(
    private actions$: Actions,
    protected userProfileService: UserProfileFacade
  ) {}

  loadDefaultPointOfService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DefaultPointOfServiceActions.LOAD_DEFAULT_POINT_OF_SERVICE),
      switchMap(() =>
        this.userProfileService.get().pipe(
          mergeMap((_preferredStore) => iif(() => !!_preferredStore, {}, {})),
          map((defaultPointOfService) => {
            console.log('loadDefaultPointOfService', defaultPointOfService);
            return throwError('There was an error');
          }),
          map((_defaultPointOfService) =>
            DefaultPointOfServiceActions.LoadDefaultPointOfServiceSuccess({
              payload: {
                name: '',
                displayName: '',
              },
            })
          ),
          catchError((error) => {
            console.log('In the error', error);
            return of(
              DefaultPointOfServiceActions.LoadDefaultPointOfServiceSuccess({
                payload: {
                  name: '',
                  displayName: '',
                },
              })
            );
          })
        )
      )
    )
  );

  setDefaultPointOfService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DefaultPointOfServiceActions.SET_DEFAULT_POINT_OF_SERVICE),
      switchMap(() =>
        this.userProfileService.get().pipe(
          tap((defaultPointOfService) =>
            console.log('defaultPointOfService', defaultPointOfService)
          ),
          map((_defaultPointOfService) =>
            DefaultPointOfServiceActions.LoadDefaultPointOfServiceSuccess({
              payload: {
                name: '',
                displayName: '',
              },
            })
          )
          //   catchError((error) =>
          //     of(new StockLevelActions.StockLevelFail(normalizeHttpError(error)))
          //   )
        )
      )
    )
  );
}
