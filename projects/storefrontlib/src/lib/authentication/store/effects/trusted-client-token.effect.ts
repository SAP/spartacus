import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';

import { TrustedClientTokenService } from '../../services/trusted-client-token.service';
import { TrustedClientToken } from '../../../user/models/token-types.model';

@Injectable()
export class TrustedClientTokenEffect {
  @Effect()
  loadTrustedClientToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_TRUSTED_CLIENT_TOKEN)
    .pipe(
      mergeMap(() => {
        return this.service.loadTrustedClientToken().pipe(
          map((token: TrustedClientToken) => {
            return new fromActions.LoadTrustedClientTokenSuccess(token);
          }),
          catchError((error: any) => {
            return of(new fromActions.LoadTrustedClientTokenFail(error));
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private service: TrustedClientTokenService
  ) {}
}
