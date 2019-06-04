import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import * as fromActions from '../actions/open-id-token.action';
import {
  LoadUserToken,
  LOAD_USER_TOKEN,
  LOAD_USER_TOKEN_SUCCESS,
} from '../actions/user-token.action';

@Injectable()
export class OpenIdTokenEffect {
  @Effect()
  triggerOpenIdTokenLoading$: Observable<
    fromActions.LoadOpenIdToken
  > = this.actions$.pipe(
    ofType<fromActions.LoadOpenIdTokenSuccess>(LOAD_USER_TOKEN_SUCCESS),
    withLatestFrom(this.actions$.pipe(ofType<LoadUserToken>(LOAD_USER_TOKEN))),
    map(
      ([, loginAction]) =>
        new fromActions.LoadOpenIdToken({
          username: loginAction.payload.userId,
          password: loginAction.payload.password,
        })
    )
  );

  @Effect()
  loadOpenIdToken$: Observable<
    fromActions.OpenIdTokenActions
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_OPEN_ID_TOKEN),
    map((action: fromActions.LoadOpenIdToken) => action.payload),
    exhaustMap(payload => {
      return this.openIdTokenService
        .loadOpenIdAuthenticationToken(payload.username, payload.password)
        .pipe(
          map(token => new fromActions.LoadOpenIdTokenSuccess(token)),
          catchError(error => of(new fromActions.LoadOpenIdTokenFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private openIdTokenService: OpenIdAuthenticationTokenService
  ) {}
}
