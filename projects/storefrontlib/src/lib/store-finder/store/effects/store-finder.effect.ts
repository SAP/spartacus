import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromAction from './../actions/find-stores.action';
import { OccStoreFinderService } from '../../../occ/store/store-finder.service';

@Injectable()
export class StoreFinderEffect {
  constructor(
    private actions$: Actions,
    private occStoreFinderService: OccStoreFinderService
  ) {}

  @Effect()
  findStores$: Observable<any> = this.actions$
    .ofType(fromAction.FIND_STORES)
    .pipe(
      map((action: fromAction.FindStores) => action.payload),
      mergeMap(payload =>
        this.occStoreFinderService
          .findStores(payload.queryText, payload.searchConfig)
          .pipe(
            map(data => {
              return new fromAction.FindStoresSuccess(data);
            }),
            catchError(error => of(new fromAction.FindStoresFail(error)))
          )
      )
    );

  @Effect()
  findAllStores$: Observable<any> = this.actions$
    .ofType(fromAction.FIND_ALL_STORES)
    .pipe(
      switchMap(() => {
        return this.occStoreFinderService.storesCount().pipe(
          map(data => new fromAction.FindAllStoresSuccess(data)),
          catchError(error => of(new fromAction.FindAllStoresFail(error)))
        );
      })
    );

  @Effect()
  findAllStoresByCountry$: Observable<any> = this.actions$
    .ofType(fromAction.FIND_ALL_STORES_BY_COUNTRY)
    .pipe(
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
  findAllStoresByRegion$: Observable<any> = this.actions$
    .ofType(fromAction.FIND_ALL_STORES_BY_REGION)
    .pipe(
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
