import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromAction from './../actions/find-stores.action';

import { OccStoreFinderService } from '../../occ/store-finder.service';

@Injectable()
export class FindStoresEffect {
  constructor(
    private actions$: Actions,
    private occStoreFinderService: OccStoreFinderService
  ) {}

  @Effect()
  findStores$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.FIND_STORES),
    map((action: fromAction.FindStores) => action.payload),
    mergeMap(payload =>
      this.occStoreFinderService
        .findStores(
          payload.queryText,
          payload.searchConfig,
          payload.longitudeLatitude
        )
        .pipe(
          map(data => {
            data.geolocation = payload.longitudeLatitude;

            if (payload.countryIsoCode) {
              data.stores = data.stores.filter(
                store =>
                  store.address.country.isocode === payload.countryIsoCode
              );
            }

            return new fromAction.FindStoresSuccess(data);
          }),
          catchError(error => of(new fromAction.FindStoresFail(error)))
        )
    )
  );

  @Effect()
  findStoreById$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.FIND_STORE_BY_ID),
    map((action: fromAction.FindStoreById) => action.payload),
    switchMap(payload =>
      this.occStoreFinderService.findStoreById(payload.storeId).pipe(
        map(data => new fromAction.FindStoreByIdSuccess(data)),
        catchError(error => of(new fromAction.FindStoreByIdFail(error)))
      )
    )
  );
}
