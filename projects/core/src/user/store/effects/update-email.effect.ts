import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UpdateEmailEffects {
  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
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
              new UserActions.UpdateEmailErrorAction(
                makeErrorSerializable(error)
              )
            )
          )
        )
    )
  );
}
