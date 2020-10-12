import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ClientToken } from '../../../client-auth/models/client-token.model';
import { ClientAuthenticationTokenService } from '../../services/client-authentication-token.service';
import { ClientAuthActions } from '../actions/index';

@Injectable()
export class ClientTokenEffect {
  @Effect()
  loadClientToken$: Observable<
    ClientAuthActions.ClientTokenAction
  > = this.actions$.pipe(
    ofType(ClientAuthActions.LOAD_CLIENT_TOKEN),
    exhaustMap(() => {
      return this.clientAuthenticationTokenService
        .loadClientAuthenticationToken()
        .pipe(
          map((token: ClientToken) => {
            return new ClientAuthActions.LoadClientTokenSuccess(token);
          }),
          catchError((error) =>
            of(
              new ClientAuthActions.LoadClientTokenFail(
                makeErrorSerializable(error)
              )
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
