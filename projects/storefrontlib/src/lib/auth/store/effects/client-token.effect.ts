import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Actions, Effect } from '@ngrx/effects';

import * as fromActions from '@auth/store/actions';
import { OccClientAuthenticationTokenService } from '@auth/client-authentication/client-authentication-token.service';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ClientAuthenticationToken } from '@auth/models/token-types.model';

@Injectable()
export class ClientTokenEffect {
  @Effect()
  loadClientToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_CLIENT_TOKEN)
    .pipe(
      mergeMap(() => {
        return this.clientAuthenticationTokenService
          .loadClientAuthenticationToken()
          .pipe(
            map((token: ClientAuthenticationToken) => {
              return new fromActions.LoadClientTokenSuccess(token);
            }),
            catchError(error => of(new fromActions.LoadClientTokenFail(error)))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private clientAuthenticationTokenService: OccClientAuthenticationTokenService
  ) {}
}
