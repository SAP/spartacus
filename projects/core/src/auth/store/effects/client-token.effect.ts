import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as fromActions from './../actions';
import { ClientTokenAction } from '../actions/client-token.action';
import { ClientToken } from './../../models/token-types.model';
import { ClientAuthenticationTokenService } from './../../services/client-authentication/client-authentication-token.service';

@Injectable()
export class ClientTokenEffect {
  @Effect()
  loadClientToken$: Observable<ClientTokenAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLIENT_TOKEN),
    exhaustMap(() => {
      return this.clientAuthenticationTokenService
        .loadClientAuthenticationToken()
        .pipe(
          map((token: ClientToken) => {
            return new fromActions.LoadClientTokenSuccess(token);
          }),
          catchError(error => of(new fromActions.LoadClientTokenFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private clientAuthenticationTokenService: ClientAuthenticationTokenService
  ) {}
}
