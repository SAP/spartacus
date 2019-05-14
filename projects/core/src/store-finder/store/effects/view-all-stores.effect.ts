import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from './../actions/view-all-stores.action';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';

@Injectable()
export class ViewAllStoresEffect {
  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  @Effect()
  viewAllStores$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.VIEW_ALL_STORES),
    switchMap(() => {
      return this.storeFinderConnector.getCount().pipe(
        map(data => new fromAction.ViewAllStoresSuccess(data)),
        catchError(error => of(new fromAction.ViewAllStoresFail(error)))
      );
    })
  );
}
