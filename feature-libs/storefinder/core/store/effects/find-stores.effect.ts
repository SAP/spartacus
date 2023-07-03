/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';

@Injectable()
export class FindStoresEffect {
  protected logger = inject(LoggerService);

  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  findStores$: Observable<
    StoreFinderActions.FindStoresSuccess | StoreFinderActions.FindStoresFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreFinderActions.FIND_STORES),
      map((action: StoreFinderActions.FindStores) => action.payload),
      mergeMap((payload) =>
        this.storeFinderConnector
          .search(
            payload.queryText,
            payload.searchConfig,
            payload.longitudeLatitude,
            payload.radius
          )
          .pipe(
            map((data) => {
              if (payload.countryIsoCode) {
                data.stores = data.stores.filter(
                  (store) =>
                    store.address.country.isocode === payload.countryIsoCode
                );
                data.stores.sort((a, b) =>
                  a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                );
              }

              return new StoreFinderActions.FindStoresSuccess(data);
            }),
            catchError((error) =>
              of(
                new StoreFinderActions.FindStoresFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          )
      )
    )
  );

  findStoreById$: Observable<
    | StoreFinderActions.FindStoreByIdSuccess
    | StoreFinderActions.FindStoreByIdFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(StoreFinderActions.FIND_STORE_BY_ID),
      map((action: StoreFinderActions.FindStoreById) => action.payload),
      switchMap((payload) =>
        this.storeFinderConnector.get(payload.storeId).pipe(
          map((data) => new StoreFinderActions.FindStoreByIdSuccess(data)),
          catchError((error) =>
            of(
              new StoreFinderActions.FindStoreByIdFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );
}
