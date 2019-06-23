import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoadUserToken, Logout } from '../../../auth/index';
import { UserSignUp } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import * as fromActions from '../actions/user-register.action';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<
    fromActions.UserRegisterOrRemoveAction | LoadUserToken
  > = this.actions$.pipe(
    ofType(fromActions.REGISTER_USER),
    map((action: fromActions.RegisterUser) => action.payload),
    mergeMap((user: UserSignUp) =>
      this.userConnector.register(user).pipe(
        switchMap(_result => [
          new LoadUserToken({
            userId: user.uid,
            password: user.password,
          }),
          new fromActions.RegisterUserSuccess(),
        ]),
        catchError(error =>
          of(new fromActions.RegisterUserFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  removeUser$: Observable<
    fromActions.UserRegisterOrRemoveAction | Logout
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_USER),
    map((action: fromActions.RemoveUser) => action.payload),
    mergeMap((userId: string) => {
      return this.userConnector.remove(userId).pipe(
        switchMap(_result => [
          new fromActions.RemoveUserSuccess(),
          new Logout(),
        ]),
        catchError(error =>
          of(new fromActions.RemoveUserFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
