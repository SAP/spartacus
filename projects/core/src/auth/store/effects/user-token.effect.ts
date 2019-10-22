import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserToken } from '../../models/token-types.model';
import { UserAuthenticationTokenService } from '../../services/user-authentication/user-authentication-token.service';
import { AuthActions } from '../actions/index';

@Injectable()
export class UserTokenEffects {
  @Effect()
  loadUserToken$: Observable<AuthActions.UserTokenAction> = this.actions$.pipe(
    ofType(AuthActions.LOAD_USER_TOKEN),
    map((action: AuthActions.LoadUserToken) => action.payload),
    mergeMap(({ userId, password }) =>
      this.userTokenService.loadToken(userId, password).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.expiration_time = date.toJSON();
          token.userId = OCC_USER_ID_CURRENT;
          return new AuthActions.LoadUserTokenSuccess(token);
        }),
        catchError(error =>
          of(new AuthActions.LoadUserTokenFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  @Effect()
  login$: Observable<AuthActions.Login> = this.actions$.pipe(
    ofType(AuthActions.LOAD_USER_TOKEN_SUCCESS),
    map(() => new AuthActions.Login())
  );

  @Effect()
  refreshUserToken$: Observable<
    AuthActions.UserTokenAction
  > = this.actions$.pipe(
    ofType(AuthActions.REFRESH_USER_TOKEN),
    map((action: AuthActions.RefreshUserToken) => action.payload),
    exhaustMap(({ refreshToken }) => {
      return this.userTokenService.refreshToken(refreshToken).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.expiration_time = date.toJSON();
          return new AuthActions.RefreshUserTokenSuccess(token);
        }, catchError(error => of(new AuthActions.RefreshUserTokenFail(makeErrorSerializable(error)))))
      );
    })
  );

  @Effect()
  revoke$: Observable<AuthActions.Logout> = this.actions$.pipe(
    ofType(AuthActions.REVOKE_TOKEN),
    tap(action => console.log('revoke$ effect: Caught revoke action', action)),
    map((action: AuthActions.RevokeToken) => {
      return action.payload;
    }),
    exhaustMap(userToken => {
      console.log(
        'revoke$ effect: Caught revoke action for token: ',
        userToken
      );
      return of(new AuthActions.Logout());
    })
  );

  constructor(
    private actions$: Actions,
    private userTokenService: UserAuthenticationTokenService
  ) {}
}
