import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromAction from './../actions/find-stores.action';
import { OccStoreFinderService } from '../../../occ/store/store-finder.service';

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
            return new fromAction.FindStoresSuccess(data);
          }),
          catchError(error => of(new fromAction.FindStoresFail(error)))
        )
    )
  );

  @Effect()
  findAllStoresByCountry$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.FIND_ALL_STORES_BY_COUNTRY),
    map((action: fromAction.FindAllStoresByCountry) => action.payload),
    mergeMap(payload =>
      this.occStoreFinderService
        .findStoresByCountry(payload.countryIsoCode)
        .pipe(
          map(data => {
            return new fromAction.FindAllStoresByCountrySuccess(data);
          }),
          catchError(error =>
            of(new fromAction.FindAllStoresByCountryFail(error))
          )
        )
    )
  );

  @Effect()
  findAllStoresByRegion$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.FIND_ALL_STORES_BY_REGION),
    map((action: fromAction.FindAllStoresByRegion) => action.payload),
    mergeMap(payload =>
      this.occStoreFinderService
        .findStoresByRegion(payload.countryIsoCode, payload.regionIsoCode)
        .pipe(
          map(data => {
            return new fromAction.FindAllStoresByRegionSuccess(data);
          }),
          catchError(error =>
            of(new fromAction.FindAllStoresByRegionFail(error))
          )
        )
    )
  );
}
