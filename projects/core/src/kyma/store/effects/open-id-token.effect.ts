import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { iif, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AuthActions } from '../../../auth/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { KymaConfig } from '../../config/kyma-config';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import { KymaActions } from '../actions/index';

@Injectable()
export class OpenIdTokenEffect {
  @Effect()
  triggerOpenIdTokenLoading$: Observable<KymaActions.LoadOpenIdToken> = iif<
    KymaActions.LoadOpenIdToken,
    KymaActions.LoadOpenIdToken
  >(
    () => this.config.authentication && this.config.authentication.kyma_enabled,
    this.actions$.pipe(
      ofType<KymaActions.LoadOpenIdTokenSuccess>(
        AuthActions.LOAD_USER_TOKEN_SUCCESS
      ),
      withLatestFrom(
        this.actions$.pipe(
          ofType<AuthActions.LoadUserToken>(AuthActions.LOAD_USER_TOKEN)
        )
      ),
      map(
        ([, loginAction]) =>
          new KymaActions.LoadOpenIdToken({
            username: loginAction.payload.userId,
            password: loginAction.payload.password,
          })
      )
    )
  );

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
    private openIdTokenService: OpenIdAuthenticationTokenService,
    private config: KymaConfig
  ) {}
}
