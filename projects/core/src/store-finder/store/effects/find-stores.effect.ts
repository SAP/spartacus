import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import * as fromAction from './../actions/find-stores.action';

@Injectable()
export class FindStoresEffect {
  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  @Effect()
  findStores$: Observable<
    fromAction.FindStoresSuccess | fromAction.FindStoresFail
  > = this.actions$.pipe(
    ofType(fromAction.FIND_STORES),
    map((action: fromAction.FindStores) => action.payload),
    mergeMap(payload =>
      this.storeFinderConnector
        .search(
          payload.queryText,
          payload.searchConfig,
          payload.longitudeLatitude
        )
        .pipe(
          map(data => {
            if (payload.countryIsoCode) {
              data.stores = data.stores.filter(
                store =>
                  store.address.country.isocode === payload.countryIsoCode
              );
            }

            return new fromAction.FindStoresSuccess(data);
          }),
          catchError(error =>
            of(new fromAction.FindStoresFail(makeErrorSerializable(error)))
          )
        )
    )
  );

  @Effect()
  findStoreById$: Observable<
    fromAction.FindStoreByIdSuccess | fromAction.FindStoreByIdFail
  > = this.actions$.pipe(
    ofType(fromAction.FIND_STORE_BY_ID),
    map((action: fromAction.FindStoreById) => action.payload),
    switchMap(payload =>
      this.storeFinderConnector.get(payload.storeId).pipe(
        map(data => new fromAction.FindStoreByIdSuccess(data)),
        catchError(error =>
          of(new fromAction.FindStoreByIdFail(makeErrorSerializable(error)))
        )
      )
    )
  );
}
