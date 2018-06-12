import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';

import { OccClientAuthenticationTokenService } from '../../../occ/client-auth/client-authentication-token.service';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

@Injectable()
export class ClientAuthenticationTokenEffect {
  @Effect()
  loadClientAuthenticationToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_CLIENT_AUTHENTICATION_TOKEN)
    .pipe(
      mergeMap(() => {
        return this.service.loadClientAuthenticationToken().pipe(
          map((token: ClientAuthenticationToken) => {
            return new fromActions.LoadClientAuthenticationTokenSuccess(token);
          }),
          catchError((error: any) => {
            return of(new fromActions.LoadClientAuthenticationTokenFail(error));
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: OccClientAuthenticationTokenService
  ) {}
}
