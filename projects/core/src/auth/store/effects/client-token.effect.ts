import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { ClientToken } from '../../models/token-types.model';
import { ClientAuthenticationTokenService } from '../../services/client-authentication/client-authentication-token.service';
import { AuthActions } from '../actions/index';

@Injectable()
export class ClientTokenEffect {
  @Effect()
  loadClientToken$: Observable<
    AuthActions.ClientTokenAction
  > = this.actions$.pipe(
    ofType(AuthActions.LOAD_CLIENT_TOKEN),
    exhaustMap(() => {
      return this.clientAuthenticationTokenService
        .loadClientAuthenticationToken()
        .pipe(
          map((token: ClientToken) => {
            return new AuthActions.LoadClientTokenSuccess(token);
          }),
          catchError((error) =>
            of(
              new AuthActions.LoadClientTokenFail(makeErrorSerializable(error))
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private clientAuthenticationTokenService: ClientAuthenticationTokenService
  ) {}
}
