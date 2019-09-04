import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { USERID_CURRENT } from '../../../occ/utils/occ-constants';
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
          token.userId = USERID_CURRENT;
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
    exhaustMap(({ refreshToken, expiredToken }) => {
      return this.userTokenService.refreshToken(refreshToken).pipe(
        map((newToken: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + newToken.expires_in);
          newToken.expiration_time = date.toJSON();
          if (!!expiredToken && expiredToken.userId) {
            newToken.userId = expiredToken.userId;
          } else {
            newToken.userId = USERID_CURRENT;
          }
          return new AuthActions.RefreshUserTokenSuccess(newToken);
        }, catchError(error => of(new AuthActions.RefreshUserTokenFail(makeErrorSerializable(error)))))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userTokenService: UserAuthenticationTokenService
  ) {}
}
