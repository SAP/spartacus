/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';

@Injectable()
export class BaseSiteEffects {
  protected logger = inject(LoggerService);

  loadBaseSite$: Observable<
    SiteContextActions.LoadBaseSiteSuccess | SiteContextActions.LoadBaseSiteFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteContextActions.LOAD_BASE_SITE),
      exhaustMap(() => {
        return this.siteConnector.getBaseSite().pipe(
          map((baseSite) => {
            if (baseSite) {
              return new SiteContextActions.LoadBaseSiteSuccess(baseSite);
            } else {
              throw new Error('BaseSite is not found');
            }
          }),
          catchError((error) =>
            of(
              new SiteContextActions.LoadBaseSiteFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  loadBaseSites$: Observable<
    | SiteContextActions.LoadBaseSitesSuccess
    | SiteContextActions.LoadBaseSitesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(SiteContextActions.LOAD_BASE_SITES),
      exhaustMap(() => {
        return this.siteConnector.getBaseSites().pipe(
          map(
            (baseSites) =>
              new SiteContextActions.LoadBaseSitesSuccess(baseSites)
          ),
          catchError((error) =>
            of(
              new SiteContextActions.LoadBaseSitesFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
