/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import { EffectsErrorHandlerService } from './effects-error-handler.service';
import { ErrorAction } from '../../model/index';
import { Observable } from 'rxjs';

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
