import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import * as actions from '../actions/base-site.action';
import { SiteConnector } from '../../connectors/site.connector';

@Injectable()
export class BaseSiteEffects {
  @Effect()
  loadBaseSite$: Observable<any> = this.actions$.pipe(
    ofType(actions.SET_ACTIVE_BASE_SITE),
    exhaustMap(() => {
      return this.siteConnector.getBaseSite().pipe(
        map(baseSite => new actions.SetActiveBaseSiteSuccess(baseSite)),
        catchError(error => of(new actions.SetActiveBaseSiteFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
