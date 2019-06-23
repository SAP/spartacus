import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import * as fromAction from './../actions/view-all-stores.action';

@Injectable()
export class ViewAllStoresEffect {
  constructor(
    private actions$: Actions,
    private storeFinderConnector: StoreFinderConnector
  ) {}

  @Effect()
  viewAllStores$: Observable<
    fromAction.ViewAllStoresSuccess | fromAction.ViewAllStoresFail
  > = this.actions$.pipe(
    ofType(fromAction.VIEW_ALL_STORES),
    switchMap(() => {
      return this.storeFinderConnector.getCounts().pipe(
        map(data => new fromAction.ViewAllStoresSuccess(data)),
        catchError(error =>
          of(new fromAction.ViewAllStoresFail(makeErrorSerializable(error)))
        )
      );
    })
  );
}
