import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';

@Injectable()
export class BaseSiteEffects {
  @Effect()
  loadBaseSite$: Observable<
    SiteContextActions.LoadBaseSiteSuccess | SiteContextActions.LoadBaseSiteFail
  > = this.actions$.pipe(
    ofType(SiteContextActions.LOAD_BASE_SITE),
    exhaustMap(() => {
      return this.siteConnector.getBaseSite().pipe(
        map((baseSite) => new SiteContextActions.LoadBaseSiteSuccess(baseSite)),
        catchError((error) =>
          of(
            new SiteContextActions.LoadBaseSiteFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
