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
import { ErrorAction } from '../../model/index';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

@Injectable()
export class CxErrorHandlerEffect {
  protected actions$ = inject(Actions);
  protected effectsErrorHandlerService = inject(EffectsErrorHandlerService);
  protected featureConfigService = inject(FeatureConfigService);

  error$: Observable<ErrorAction> = createEffect(
    () =>
      this.actions$.pipe(
        filter(this.effectsErrorHandlerService.filterActions),
        tap((errorAction) => {
          if (
            this.featureConfigService.isEnabled(
              'strictHttpAndNgrxErrorHandling'
            )
          ) {
            this.effectsErrorHandlerService.handleError(errorAction);
          }
        })
      ),
    { dispatch: false }
  );
}
