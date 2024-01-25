/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { CmsRoute } from '../../models/cms-route';

@Injectable()
export class RouterEffects {
  clearCmsRoutes$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SiteContextActions.LANGUAGE_CHANGE,
          AuthActions.LOGOUT,
          AuthActions.LOGIN
        ),
        tap(() => {
          const filteredConfig = this.router.config.filter(
            (route: CmsRoute) => !(route.data && route.data.cxCmsRouteContext)
          );
          if (filteredConfig.length !== this.router.config.length) {
            this.router.resetConfig(filteredConfig);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
