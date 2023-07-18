/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import { EntityFailAction } from '../../state/utils/entity-loader';
import { EntityScopedLoaderActions } from '../../state/utils/scoped-loader/entity-scoped-loader.actions';
import { EffectsErrorHandlerService } from './effects-error-handler.service';
import EntityScopedFailAction = EntityScopedLoaderActions.EntityScopedFailAction;

@Injectable()
export class CxErrorHandlerEffect {
  error$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(
          (action) =>
            action instanceof EntityFailAction ||
            action instanceof EntityScopedFailAction ||
            this.effectErrorHandler.filterActions(action)
        ),
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
