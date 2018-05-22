import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserDetailsAction from '../actions/user-details.action';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<any> = this.actions$
    .ofType(fromUserDetailsAction.LOAD_USER_DETAILS)
    .pipe(
      map((action: fromUserDetailsAction.LoadUserDetails) => action.payload),
      mergeMap(userId => {
        return this.occUserService.loadUser(userId).pipe(
          map((user: any) => {
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
