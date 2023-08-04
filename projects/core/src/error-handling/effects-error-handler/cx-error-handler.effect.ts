/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import { EffectsErrorHandlerService } from './effects-error-handler.service';
import { Action } from '@ngrx/store';
import { ErrorAction } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class CxErrorHandlerEffect {
  error$: Observable<ErrorAction> = createEffect(
    () =>
      this.actions$.pipe(
        filter((action: Action) =>
          this.effectErrorHandler.filterActions(action)
        ),
        map((action: Action) => action as ErrorAction),
        tap((action: ErrorAction) => {
          this.effectErrorHandler.handleError(action);
        })
      ),
    { dispatch: false }
  );

  constructor(
    protected actions$: Actions,
    protected effectErrorHandler: EffectsErrorHandlerService
  ) {}
}
