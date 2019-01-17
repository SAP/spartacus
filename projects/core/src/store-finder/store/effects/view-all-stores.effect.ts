import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccStoreFinderService } from '../../occ/store-finder.service';

import * as fromAction from './../actions/view-all-stores.action';

@Injectable()
export class ViewAllStoresEffect {
  constructor(
    private actions$: Actions,
    private occStoreFinderService: OccStoreFinderService
  ) {}

  @Effect()
  viewAllStores$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.VIEW_ALL_STORES),
    switchMap(() => {
      return this.occStoreFinderService.storesCount().pipe(
        map(data => new fromAction.ViewAllStoresSuccess(data)),
        catchError(error => of(new fromAction.ViewAllStoresFail(error)))
      );
    })
  );
}
