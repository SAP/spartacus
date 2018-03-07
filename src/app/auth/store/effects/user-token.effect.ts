import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from './../actions/user-token.action';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { UserToken } from '../../models/token-types.model';
import { OccUserService } from '../../../newocc/user/user.service';

@Injectable()
export class UserTokenEffects {
  @Effect()
  loadUserToken$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_USER_TOKEN)
    .pipe(
      map((action: fromActions.LoadUserToken) => action.payload),
      mergeMap(({ userId, password }) => {
        return this.userService.loadToken(userId, password).pipe(
          map((token: UserToken) => {
            token.userId = userId;
            return new fromActions.LoadUserTokenSuccess(token);
          }),
          catchError(error => of(new fromActions.LoadUserTokenFail(error)))
        );
      })
    );

  constructor(private actions$: Actions, private userService: OccUserService) {}
}
