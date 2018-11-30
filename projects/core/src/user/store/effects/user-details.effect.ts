import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../occ';
import * as fromUserDetailsAction from '../actions/user-details.action';
import { User } from '../../../occ-models';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromUserDetailsAction.LOAD_USER_DETAILS),
    map((action: fromUserDetailsAction.LoadUserDetails) => action.payload),
    mergeMap(userId => {
      return this.occUserService.loadUser(userId).pipe(
        map((user: User) => {
          return new fromUserDetailsAction.LoadUserDetailsSuccess(user);
        }),
        catchError(error =>
          of(new fromUserDetailsAction.LoadUserDetailsFail(error))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
