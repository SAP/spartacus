import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateUtils } from '../../../state/utils/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';
import { REGIONS } from '../user-state';

@Injectable()
export class RegionsEffects {
  @Effect()
  loadRegions$: Observable<UserActions.RegionsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_REGIONS),
    map((action: UserActions.LoadRegions) => {
      return action.payload;
    }),
    switchMap((countryCode: string) => {
      return this.siteConnector.getRegions(countryCode).pipe(
        map(
          (regions) =>
            new UserActions.LoadRegionsSuccess({
              entities: regions,
              country: countryCode,
            })
        ),
        catchError((error) =>
          of(new UserActions.LoadRegionsFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  resetRegions$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_REGIONS),
    map(() => {
      return new StateUtils.LoaderResetAction(REGIONS);
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
