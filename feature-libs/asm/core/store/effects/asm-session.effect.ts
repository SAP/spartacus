import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { Observable, switchMap, map, catchError, of } from 'rxjs';
import { AsmSessionActions } from '../actions';
import { inject, Injectable } from '@angular/core';
import { AsmConnector } from '../../connectors';

@Injectable()
export class AsmSessionEffects {
  protected logger = inject(LoggerService);

  createASMSeesionEvent$: Observable<AsmSessionActions.ASMSessionAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(AsmSessionActions.ASSISTED_SESSION_CREATION),
        map(
          (action: AsmSessionActions.ASMSessionCreationAction) => action.payload
        ),
        switchMap((payload) =>
          this.asmConnector.createSessionStartRegistration(payload).pipe(
            map(() => new AsmSessionActions.ASMSessionCreationSuccess()),
            catchError((error) =>
              of(
                new AsmSessionActions.ASMSessionCreationFail(
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
