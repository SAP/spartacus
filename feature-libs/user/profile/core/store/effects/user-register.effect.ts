import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserSignUp } from '../../model/user-profile.model';
import { UserProfileActions } from '../actions/index';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<
    UserProfileActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserProfileActions.REGISTER_USER),
    map((action: UserProfileActions.RegisterUser) => action.payload),
    mergeMap((user: UserSignUp) =>
      this.userConnector.register(user).pipe(
        map(() => new UserProfileActions.RegisterUserSuccess()),
        catchError((error) =>
          of(new UserProfileActions.RegisterUserFail(normalizeHttpError(error)))
        )
      )
    )
  );

  @Effect()
  registerGuest$: Observable<
    UserProfileActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserProfileActions.REGISTER_GUEST),
    map((action: UserProfileActions.RegisterGuest) => action.payload),
    mergeMap(({ guid, password }) =>
      this.userConnector.registerGuest(guid, password).pipe(
        switchMap((user) => {
          this.authService.loginWithCredentials(user.uid, password);
          return [new UserProfileActions.RegisterGuestSuccess()];
        }),
        catchError((error) =>
          of(
            new UserProfileActions.RegisterGuestFail(normalizeHttpError(error))
          )
        )
      )
    )
  );

  @Effect()
  removeUser$: Observable<
    UserProfileActions.UserRegisterOrRemoveAction
  > = this.actions$.pipe(
    ofType(UserProfileActions.REMOVE_USER),
    map((action: UserProfileActions.RemoveUser) => action.payload),
    mergeMap((userId: string) => {
      return this.userConnector.remove(userId).pipe(
        switchMap(() => {
          this.authService.logout();
          return [new UserProfileActions.RemoveUserSuccess()];
        }),
        catchError((error) =>
          of(new UserProfileActions.RemoveUserFail(normalizeHttpError(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserProfileConnector,
    private authService: AuthService
  ) {}
}
