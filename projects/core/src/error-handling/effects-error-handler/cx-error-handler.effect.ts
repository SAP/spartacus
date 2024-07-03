/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ErrorAction } from '../../error-handling/effects-error-handler/error-action';
import { FeatureConfigService } from '../../features-config';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

@Injectable()
export class CxErrorHandlerEffect {
  protected actions$ = inject(Actions);
  protected effectErrorHandlerService = inject(EffectsErrorHandlerService);
  private featureConfigService = inject(FeatureConfigService);

  error$: Observable<ErrorAction> = createEffect(
    () =>
      this.actions$.pipe(
        filter(this.effectErrorHandlerService.filterActions),
        tap((errorAction: ErrorAction) => {
          if (
            this.featureConfigService.isEnabled(
              'ssrStrictErrorHandlingForHttpAndNgrx'
            )
          ) {
            this.effectErrorHandlerService.handleError(errorAction);
          }
        })
      ),
    { dispatch: false }
  );
}
