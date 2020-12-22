import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
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
          of(new SiteContextActions.LoadBaseSiteFail(normalizeHttpError(error)))
        )
      );
    })
  );

  @Effect()
  loadBaseSites$: Observable<
    | SiteContextActions.LoadBaseSitesSuccess
    | SiteContextActions.LoadBaseSitesFail
  > = this.actions$.pipe(
    ofType(SiteContextActions.LOAD_BASE_SITES),
    exhaustMap(() => {
      return this.siteConnector.getBaseSites().pipe(
        map(
          (baseSites) => new SiteContextActions.LoadBaseSitesSuccess(baseSites)
        ),
        catchError((error) =>
          of(
            new SiteContextActions.LoadBaseSitesFail(normalizeHttpError(error))
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
