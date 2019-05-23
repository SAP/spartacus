import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoadOpenIdToken, LoadUserToken, Logout } from '../../../auth/index';
import { UserRegisterFormData } from '../../../user/model/user.model';
import { UserAccountConnector } from '../../connectors/account/user-account.connector';
import * as fromActions from '../actions/user-register.action';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<
    fromActions.UserRegisterOrRemoveAction | LoadUserToken | LoadOpenIdToken
  > = this.actions$.pipe(
    ofType(fromActions.REGISTER_USER),
    map((action: fromActions.RegisterUser) => action.payload),
    mergeMap((user: UserRegisterFormData) => {
      return this.userAccountConnector.register(user).pipe(
        switchMap(_result => [
          new LoadUserToken({
            userId: user.uid,
            password: user.password,
          }),
          new LoadOpenIdToken({
            username: user.uid,
            password: user.password,
          }),
          new fromActions.RegisterUserSuccess(),
        ]),
        catchError(error => of(new fromActions.RegisterUserFail(error)))
      );
    })
  );

  @Effect()
  removeUser$: Observable<
    fromActions.UserRegisterOrRemoveAction | Logout
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_USER),
    map((action: fromActions.RemoveUser) => action.payload),
    mergeMap((userId: string) => {
      return this.userAccountConnector.remove(userId).pipe(
        switchMap(_result => [
          new fromActions.RemoveUserSuccess(),
          new Logout(),
        ]),
        catchError(error => of(new fromActions.RemoveUserFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserAccountConnector
  ) {}
}
