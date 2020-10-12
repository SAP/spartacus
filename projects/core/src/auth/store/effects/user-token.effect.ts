import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserIdService } from '../../facade/user-id.service';
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
          // TODO: move this out of the effect for extensibility
          // TODO: Set user after we set token
          setTimeout(() => {
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
          }, 0);
          return new AuthActions.LoadUserTokenSuccess(token);
        }),
        catchError((error) =>
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
        map(
          (token: UserToken) => {
            const date = new Date();
            date.setSeconds(date.getSeconds() + token.expires_in);
            token.expiration_time = date.toJSON();
            return new AuthActions.RefreshUserTokenSuccess(token);
          },
          catchError((error) =>
            of(
              new AuthActions.RefreshUserTokenFail(makeErrorSerializable(error))
            )
          )
        )
      );
    })
  );

  @Effect()
  revokeUserToken$: Observable<
    AuthActions.UserTokenAction
  > = this.actions$.pipe(
    ofType(AuthActions.REVOKE_USER_TOKEN),
    map((action: AuthActions.RevokeUserToken) => {
      return action.payload;
    }),
    mergeMap((userToken: UserToken) => {
      return this.userTokenService.revoke(userToken).pipe(
        map(() => new AuthActions.RevokeUserTokenSuccess(userToken)),
        catchError((error) => of(new AuthActions.RevokeUserTokenFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userTokenService: UserAuthenticationTokenService,
    private userIdService: UserIdService
  ) {}
}
