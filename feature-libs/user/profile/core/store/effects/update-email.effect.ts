import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UpdateEmailEffects {
  constructor(
    private actions$: Actions,
    private userAccountConnector: UserProfileConnector
  ) {}

  @Effect()
  updateEmail$: Observable<
    UserActions.UpdateEmailSuccessAction | UserActions.UpdateEmailErrorAction
  > = this.actions$.pipe(
    ofType(UserActions.UPDATE_EMAIL),
    map((action: UserActions.UpdateEmailAction) => action.payload),
    concatMap((payload) =>
      this.userAccountConnector
        .updateEmail(payload.uid, payload.password, payload.newUid)
        .pipe(
          map(() => new UserActions.UpdateEmailSuccessAction(payload.newUid)),
          catchError((error) =>
            of(
              new UserActions.UpdateEmailErrorAction(normalizeHttpError(error))
            )
          )
        )
    )
  );
}
