import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from './../actions/user-token.action';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';

import { UserTokenService } from '../../service/user-token.service';
import { UserToken } from '../../token-types';

@Injectable()
export class UserTokenEffects {
  @Effect()
  loadUserToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_USER_TOKEN)
    .pipe(
      map((action: fromActions.LoadUserToken) => action.payload),
      mergeMap(({ username, password }) => {
        return this.userTokenService.loadToken(username, password).pipe(
          map((token: UserToken) => {
            // TODO [SPA-276] - remove this after ngrx-store-localstorage is in place?
            token = this.userTokenService.storeToken(username, token);
            return new fromActions.LoadUserTokenSuccess(token);
          }),
          catchError(error => of(new fromActions.LoadUserTokenFail(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private userTokenService: UserTokenService
  ) {}
}
