import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import { ClientAuthenticationTokenService } from './../../services/client-authentication/client-authentication-token.service';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ClientToken } from './../../models/token-types.model';
import { ClientTokenAction } from '../actions/client-token.action';

@Injectable()
export class ClientTokenEffect {
  @Effect()
  loadClientToken$: Observable<ClientTokenAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLIENT_TOKEN),
    mergeMap(() => {
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
