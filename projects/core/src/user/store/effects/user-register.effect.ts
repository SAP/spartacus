import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/user-auth/facade/auth.service';
import { UserSignUp } from '../../../model/misc.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<
    UserActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserActions.REGISTER_USER),
    map((action: UserActions.RegisterUser) => action.payload),
    mergeMap((user: UserSignUp) =>
      this.userConnector.register(user).pipe(
        map(() => new UserActions.RegisterUserSuccess()),
        catchError((error) =>
          of(new UserActions.RegisterUserFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  registerGuest$: Observable<
    UserActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserActions.REGISTER_GUEST),
    map((action: UserActions.RegisterGuest) => action.payload),
    mergeMap(({ guid, password }) =>
      this.userConnector.registerGuest(guid, password).pipe(
        switchMap((user) => {
          this.authService.authorize(user.uid, password);
          return [new UserActions.RegisterGuestSuccess()];
        }),
        catchError((error) =>
          of(new UserActions.RegisterGuestFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  removeUser$: Observable<
    UserActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserActions.REMOVE_USER),
    map((action: UserActions.RemoveUser) => action.payload),
    mergeMap((userId: string) => {
      return this.userConnector.remove(userId).pipe(
        switchMap(() => {
          this.authService.initLogout();
          return [new UserActions.RemoveUserSuccess()];
        }),
        catchError((error) =>
          of(new UserActions.RemoveUserFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector,
    private authService: AuthService
  ) {}
}
