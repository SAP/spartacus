/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { Observable, switchMap, map, catchError, of } from 'rxjs';
import { AsmSessionActions } from '../actions';
import { inject, Injectable } from '@angular/core';
import { AsmConnector } from '../../connectors';

@Injectable()
export class AsmSessionEffects {
  protected logger = inject(LoggerService);

  createAsmSessionEvent$: Observable<AsmSessionActions.AsmSessionAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(AsmSessionActions.ASSISTED_SESSION_CREATION),
        map(
          (action: AsmSessionActions.AsmSessionCreationAction) => action.payload
        ),
        switchMap((payload) =>
          this.asmConnector.createAsmSessionEvent(payload).pipe(
            map(() => new AsmSessionActions.AsmSessionCreationSuccess()),
            catchError((error) =>
              of(
                new AsmSessionActions.AsmSessionCreationFail(
                  tryNormalizeHttpError(error, this.logger)
                )
              )
            )
          )
        )
      )
    );
  constructor(
    private actions$: Actions,
    private asmConnector: AsmConnector
  ) {}
}
