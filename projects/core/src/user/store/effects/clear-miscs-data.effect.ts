/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { UserActions } from '../actions/index';

@Injectable()
export class ClearMiscsDataEffect {
  private actions$ = inject(Actions);

  clearMiscsData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SiteContextActions.LANGUAGE_CHANGE,
        SiteContextActions.CURRENCY_CHANGE
      ),
      map(() => {
        return new UserActions.ClearUserMiscsData();
      })
    )
  );
}
