/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LoggerService,
  SiteContextActions,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';

@Injectable()
export class ViewAllStoresEffect {
  protected logger = inject(LoggerService);

  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  viewAllStores$: Observable<
    | StoreFinderActions.ViewAllStoresSuccess
    | StoreFinderActions.ViewAllStoresFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(
        StoreFinderActions.VIEW_ALL_STORES,
        StoreFinderActions.CLEAR_STORE_FINDER_DATA
      ),
      switchMap(() => {
        return this.storeFinderConnector.getCounts().pipe(
          map((data) => {
            data.sort((a, b) =>
              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            );
            return new StoreFinderActions.ViewAllStoresSuccess(data);
          }),
          catchError((error) =>
            of(
              new StoreFinderActions.ViewAllStoresFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  clearStoreFinderData$: Observable<StoreFinderActions.ClearStoreFinderData> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(
          SiteContextActions.LANGUAGE_CHANGE,
          SiteContextActions.CURRENCY_CHANGE
        ),
        map(() => {
          return new StoreFinderActions.ClearStoreFinderData();
        })
      )
    );
}
