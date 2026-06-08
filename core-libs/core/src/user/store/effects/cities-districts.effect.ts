/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateUtils } from '../../../state/utils/index';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';
import { UserActions } from '../actions/index';
import { CITIES, DISTRICTS } from '../user-state';

@Injectable()
export class CitiesDistrictsEffects {
  protected logger = inject(LoggerService);

  loadCities$: Observable<UserActions.CitiesAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_CITIES),
      map(
        ({ payload: regionIsocode }: UserActions.LoadCities) => regionIsocode
      ),
      switchMap((regionIsocode: string) =>
        this.siteConnector.getCities(regionIsocode).pipe(
          map(
            (cities) =>
              new UserActions.LoadCitiesSuccess({
                entities: cities,
                regionIsocode,
              })
          ),
          catchError((error) =>
            of(
              new UserActions.LoadCitiesFail(
                tryNormalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );

  resetCities$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_CITIES),
      map(() => new StateUtils.LoaderResetAction(CITIES))
    )
  );

  loadDistricts$: Observable<UserActions.DistrictsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_DISTRICTS),
      map(({ payload: cityIsocode }: UserActions.LoadDistricts) => cityIsocode),
      switchMap((cityIsocode: string) =>
        this.siteConnector.getDistricts(cityIsocode).pipe(
          map(
            (districts) =>
              new UserActions.LoadDistrictsSuccess({
                entities: districts,
                cityIsocode,
              })
          ),
          catchError((error) =>
            of(
              new UserActions.LoadDistrictsFail(
                tryNormalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );

  resetDistricts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_DISTRICTS),
      map(() => new StateUtils.LoaderResetAction(DISTRICTS))
    )
  );

  constructor(
    protected actions$: Actions,
    protected siteConnector: SiteConnector
  ) {}
}
