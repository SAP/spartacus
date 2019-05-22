import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserToken } from '../../models/token-types.model';
import { USERID_CURRENT } from '../../util/auth-constants';
import { Login } from '../actions/login-logout.action';
import { UserTokenAction } from '../actions/user-token.action';
import { UserAuthenticationTokenService } from './../../services/user-authentication/user-authentication-token.service';
import * as fromActions from './../actions/user-token.action';

@Injectable()
export class UserTokenEffects {
  @Effect()
  loadUserToken$: Observable<UserTokenAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_TOKEN),
    map((action: fromActions.LoadUserToken) => action.payload),
    mergeMap(({ userId, password }) => {
      return this.userTokenService.loadToken(userId, password).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.userId = USERID_CURRENT;
          token.expiration_time = date;
          return new fromActions.LoadUserTokenSuccess(token);
        }),
        catchError(error => of(new fromActions.LoadUserTokenFail(error)))
      );
    })
  );

  @Effect()
  login$: Observable<Login> = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_TOKEN_SUCCESS),
    map(() => new Login())
  );

  @Effect()
  refreshUserToken$: Observable<UserTokenAction> = this.actions$.pipe(
    ofType(fromActions.REFRESH_USER_TOKEN),
    map((action: fromActions.RefreshUserToken) => action.payload),
    switchMap(({ userId, refreshToken }) => {
      return this.userTokenService.refreshToken(refreshToken).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.userId = userId;
          token.expiration_time = date;
          return new fromActions.RefreshUserTokenSuccess(token);
        }, catchError(error => of(new fromActions.RefreshUserTokenFail(error))))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userTokenService: UserAuthenticationTokenService
  ) {}
}
