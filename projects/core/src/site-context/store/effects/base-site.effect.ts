import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeHttpErrorSerializable } from '../../../util/serialization-utils';
import { SiteConnector } from '../../connectors/site.connector';
import * as actions from '../actions/base-site.action';

@Injectable()
export class BaseSiteEffects {
  @Effect()
  loadBaseSite$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOAD_BASE_SITE),
    exhaustMap(() => {
      return this.siteConnector.getBaseSite().pipe(
        map(baseSite => new actions.LoadBaseSiteSuccess(baseSite)),
        catchError(error =>
          of(new actions.LoadBaseSiteFail(makeHttpErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
