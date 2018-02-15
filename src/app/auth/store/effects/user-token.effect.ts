import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from './../actions/user-token.action';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { UserToken } from '../../models/token-types.model';
import { UserLoaderService } from '../../../data/user-loader.service';

@Injectable()
export class UserTokenEffects {
  @Effect()
  loadUserToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_USER_TOKEN)
    .pipe(
      map((action: fromActions.LoadUserToken) => action.payload),
      mergeMap(({ username, password }) => {
        return this.userLoaderService.login(username, password).pipe(
          map((token: UserToken) => {
            return new fromActions.LoadUserTokenSuccess(token);
          }),
          catchError(error => of(new fromActions.LoadUserTokenFail(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private userLoaderService: UserLoaderService
  ) {}
}
