import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/index';
import { SiteConnector } from '../../../site-context/connectors/site.connector';

@Injectable()
export class RegionsEffects {
  @Effect()
  loadRegions$: Observable<fromActions.RegionsAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_REGIONS),
    map((action: fromActions.LoadRegions) => {
      return action.payload;
    }),
    switchMap((countryCode: string) => {
      return this.siteConnector.getRegions(countryCode).pipe(
        map(regions => new fromActions.LoadRegionsSuccess(regions)),
        catchError(error => of(new fromActions.LoadRegionsFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
