/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ErrorAction } from '../../error-handling/effects-error-handler/error-action';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

@Injectable()
export class CxErrorHandlerEffect {
  error$: Observable<ErrorAction> = createEffect(
    () =>
      this.actions$.pipe(
        filter(this.effectErrorHandler.filterActions),
        tap((errorAction: ErrorAction) =>
          this.effectErrorHandler.handleError(errorAction)
        )
      ),
    { dispatch: false }
  );

  constructor(
    protected actions$: Actions,
    protected effectErrorHandler: EffectsErrorHandlerService
  ) {}
}
