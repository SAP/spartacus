/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FeatureConfigService } from '../../features-config';
import { ErrorAction } from './error-action';
import { ErrorActionService } from './error-action.service';

/**
 * Effect that captures in a centralized manner errors occurred in NgRx flow.
 * When such an action is detected, it delegates the error handling to the `ErrorActionService`.
 */
@Injectable()
export class CxErrorHandlerEffect {
  protected actions$ = inject(Actions);
  protected errorActionService = inject(ErrorActionService);
  private featureConfigService = inject(FeatureConfigService);

  error$: Observable<ErrorAction> = createEffect(
    () =>
      this.actions$.pipe(
        filter(this.errorActionService.isErrorAction),
        tap((errorAction: ErrorAction) => {
          if (
            this.featureConfigService.isEnabled(
              'ssrStrictErrorHandlingForHttpAndNgrx'
            )
          ) {
            this.errorActionService.handle(errorAction);
          }
        })
      ),
    { dispatch: false }
  );
}
