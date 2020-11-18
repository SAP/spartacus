import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import { normalizeHttpError } from '@spartacus/core';

@Injectable()
export class FindStoresEffect {
  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  @Effect()
  findStores$: Observable<
    StoreFinderActions.FindStoresSuccess | StoreFinderActions.FindStoresFail
  > = this.actions$.pipe(
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
            of(new StoreFinderActions.FindStoresFail(normalizeHttpError(error)))
          )
        )
    )
  );

  @Effect()
  findStoreById$: Observable<
    | StoreFinderActions.FindStoreByIdSuccess
    | StoreFinderActions.FindStoreByIdFail
  > = this.actions$.pipe(
    ofType(StoreFinderActions.FIND_STORE_BY_ID),
    map((action: StoreFinderActions.FindStoreById) => action.payload),
    switchMap((payload) =>
      this.storeFinderConnector.get(payload.storeId).pipe(
        map((data) => new StoreFinderActions.FindStoreByIdSuccess(data)),
        catchError((error) =>
          of(
            new StoreFinderActions.FindStoreByIdFail(normalizeHttpError(error))
          )
        )
      )
    )
  );
}
