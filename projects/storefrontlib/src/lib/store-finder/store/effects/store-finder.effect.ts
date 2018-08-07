import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromAction from '../actions/list-stores.action';
import { OccStoreFinderService } from '../../../occ/store/store-finder.service';

@Injectable()
export class StoreFinderEffect {
  constructor(
    private action$: Actions,
    private occStoreFinderService: OccStoreFinderService
  ) {}

  @Effect()
  findStores$: Observable<any> = this.action$
    .ofType(fromAction.LIST_STORES)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload =>
        this.occStoreFinderService.listStores(payload.address).pipe(
          map(data => {
            return new fromAction.ListStoresSuccess(data);
          }),
          catchError(error => of(new fromAction.ListStoresFail(error)))
        )
      )
    );
}
