import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserIdService } from '../../../auth/facade/user-id.service';
import { AuthActions } from '../../../auth/store/actions/index';
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
    UserActions.UserRegisterOrRemoveAction | AuthActions.LoadUserToken
  > = this.actions$.pipe(
    ofType(UserActions.REGISTER_GUEST),
    map((action: UserActions.RegisterGuest) => action.payload),
    mergeMap(({ guid, password }) =>
      this.userConnector.registerGuest(guid, password).pipe(
        switchMap((user) => [
          new AuthActions.LoadUserToken({
            userId: user.uid,
            password: password,
          }),
          new UserActions.RegisterGuestSuccess(),
        ]),
        catchError((error) =>
          of(new UserActions.RegisterGuestFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  removeUser$: Observable<
    | UserActions.UserRegisterOrRemoveAction
    | AuthActions.Logout
    | AuthActions.ClearUserToken
  > = this.actions$.pipe(
    ofType(UserActions.REMOVE_USER),
    map((action: UserActions.RemoveUser) => action.payload),
    mergeMap((userId: string) => {
      return this.userConnector.remove(userId).pipe(
        switchMap(() => {
          this.userIdService.clearUserId();
          return [
            new UserActions.RemoveUserSuccess(),
            new AuthActions.ClearUserToken(),
            new AuthActions.Logout(),
          ];
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
    private userIdService: UserIdService
  ) {}
}
