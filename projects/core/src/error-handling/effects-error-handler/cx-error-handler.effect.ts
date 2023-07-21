/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

@Injectable()
export class CxErrorHandlerEffect {
  error$ = createEffect(
    () =>
      this.actions$.pipe(
        filter((action) => this.effectErrorHandler.filterActions(action)),
        tap((action) => {
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
