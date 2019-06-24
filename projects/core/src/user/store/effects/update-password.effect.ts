import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import * as fromActions from '../actions/update-password.action';

@Injectable()
export class UpdatePasswordEffects {
  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}

  @Effect()
  updatePassword$: Observable<
    fromActions.UpdatePasswordSuccess | fromActions.UpdatePasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_PASSWORD),
    map((action: fromActions.UpdatePassword) => action.payload),
    concatMap(payload =>
      this.userAccountConnector
        .updatePassword(
          payload.userId,
          payload.oldPassword,
          payload.newPassword
        )
        .pipe(
          map(_ => new fromActions.UpdatePasswordSuccess()),
          catchError(error =>
            of(new fromActions.UpdatePasswordFail(makeErrorSerializable(error)))
          )
        )
    )
  );
}
