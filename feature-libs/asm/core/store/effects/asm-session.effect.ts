import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { Observable, switchMap, map, catchError, of } from 'rxjs';
import { AsmSessionActions } from '../actions';
import { inject, Injectable } from '@angular/core';
import { AsmConnector } from '../../connectors';
import { ASSISTED_SESSION_REGISTRATION_START } from '../actions/asm-session-actions';

@Injectable()
export class AsmSessionEffects {
  protected logger = inject(LoggerService);

  createSessionRegistrationStart$: Observable<AsmSessionActions.ASMSessionAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(ASSISTED_SESSION_REGISTRATION_START),
        switchMap(() =>
          this.asmConnector.createSessionStartRegistration().pipe(
            map(() => new AsmSessionActions.AssistedSessionRegistrationSuccess()),
            catchError((error) =>
              of(
                new AsmSessionActions.AssistedSessionRegistrationFail(
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
