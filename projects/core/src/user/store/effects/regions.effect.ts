import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/index';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import { Action } from '@ngrx/store';
import { CLEAR_MISCS_DATA } from '../actions/index';
import { REGIONS } from '../user-state';
import { LoaderResetAction } from '../../../state';

@Injectable()
export class RegionsEffects {
  @Effect()
  loadRegions$: Observable<fromActions.RegionsAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_REGIONS),
    map((action: fromActions.LoadRegions) => {
      return action.payload;
    }),
    switchMap((countryCode: string) => {
      return this.userPaymentConnector.getRegions(countryCode).pipe(
        map(
          regions =>
            new fromActions.LoadRegionsSuccess({
              entities: regions,
              country: countryCode,
            })
        ),
        catchError(error => of(new fromActions.LoadRegionsFail(error)))
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
    private userPaymentConnector: UserPaymentConnector
  ) {}
}
