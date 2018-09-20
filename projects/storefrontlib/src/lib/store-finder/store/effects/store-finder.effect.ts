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
          .findStores(payload.queryText, payload.searchConfig, payload.longitudeLatitude)
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
}
