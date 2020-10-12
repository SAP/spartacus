import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import { KymaActions } from '../actions/index';

@Injectable()
export class OpenIdTokenEffect {
  // TODO(#8247): Fix kyma to work with the OAuth library out of the box
  // @Effect()
  // triggerOpenIdTokenLoading$: Observable<
  //   KymaActions.LoadOpenIdToken
  // > = this.actions$.pipe(
  //   ofType<KymaActions.LoadOpenIdTokenSuccess>(
  //     AuthActions.LOAD_USER_TOKEN_SUCCESS
  //   ),
  //   withLatestFrom(
  //     this.actions$.pipe(
  //       ofType<AuthActions.LoadUserToken>(AuthActions.LOAD_USER_TOKEN)
  //     )
  //   ),
  //   map(
  //     ([, loginAction]) =>
  //       new KymaActions.LoadOpenIdToken({
  //         username: loginAction.payload.userId,
  //         password: loginAction.payload.password,
  //       })
  //   )
  // );

  @Effect()
  loadOpenIdToken$: Observable<
    KymaActions.OpenIdTokenActions
  > = this.actions$.pipe(
    ofType(KymaActions.LOAD_OPEN_ID_TOKEN),
    map((action: KymaActions.LoadOpenIdToken) => action.payload),
    exhaustMap((payload) =>
      this.openIdTokenService
        .loadOpenIdAuthenticationToken(payload.username, payload.password)
        .pipe(
          map((token) => new KymaActions.LoadOpenIdTokenSuccess(token)),
          catchError((error) =>
            of(
              new KymaActions.LoadOpenIdTokenFail(makeErrorSerializable(error))
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private openIdTokenService: OpenIdAuthenticationTokenService
  ) {}
}
