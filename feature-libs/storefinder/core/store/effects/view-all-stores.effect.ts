import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import { normalizeHttpError, SiteContextActions } from '@spartacus/core';

@Injectable()
export class ViewAllStoresEffect {
  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  @Effect()
  viewAllStores$: Observable<
    | StoreFinderActions.ViewAllStoresSuccess
    | StoreFinderActions.ViewAllStoresFail
  > = this.actions$.pipe(
    ofType(
      StoreFinderActions.VIEW_ALL_STORES,
      StoreFinderActions.CLEAR_STORE_FINDER_DATA
    ),
    switchMap(() => {
      return this.storeFinderConnector.getCounts().pipe(
        map((data) => {
          data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          return new StoreFinderActions.ViewAllStoresSuccess(data);
        }),
        catchError((error) =>
          of(
            new StoreFinderActions.ViewAllStoresFail(normalizeHttpError(error))
          )
        )
      );
    })
  );

  @Effect()
  clearStoreFinderData$: Observable<StoreFinderActions.ClearStoreFinderData> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    map(() => {
      return new StoreFinderActions.ClearStoreFinderData();
    })
  );
}
