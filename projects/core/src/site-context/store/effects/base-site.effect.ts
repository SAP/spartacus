import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as actions from '../actions/base-site.action';
import { SiteConnector } from '../../connectors/site.connector';

@Injectable()
export class BaseSiteEffects {
  @Effect()
  loadBaseSite$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_BASE_SITE),
    exhaustMap(() => {
      return this.siteConnector.getBaseSite().pipe(
        map(baseSite => new actions.LoadBaseSiteSuccess(baseSite)),
        catchError(error => of(new actions.LoadBaseSiteFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
