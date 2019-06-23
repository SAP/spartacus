import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { LoaderResetAction } from '../../../state/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import * as fromActions from '../actions/index';
import { CLEAR_MISCS_DATA } from '../actions/index';
import { REGIONS } from '../user-state';

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
        map(
          regions =>
            new fromActions.LoadRegionsSuccess({
              entities: regions,
              country: countryCode,
            })
        ),
        catchError(error =>
          of(new fromActions.LoadRegionsFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  resetRegions$: Observable<Action> = this.actions$.pipe(
    ofType(CLEAR_MISCS_DATA, fromActions.CLEAR_REGIONS),
    map(() => {
      return new LoaderResetAction(REGIONS);
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
