import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators';

import * as fromUserDetailsAction from '../actions/user-details.action';
import { OccUserService } from '../../occ/index';
import { User } from '../../../occ/occ-models/index';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<
    fromUserDetailsAction.UserDetailsAction
  > = this.actions$.pipe(
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

  @Effect()
  updateUserDetails$: Observable<
    | fromUserDetailsAction.UpdateUserDetailsSuccess
    | fromUserDetailsAction.UpdateUserDetailsFail
  > = this.actions$.pipe(
    ofType(fromUserDetailsAction.UPDATE_USER_DETAILS),
    map((action: fromUserDetailsAction.UpdateUserDetails) => action.payload),
    // TODO:#1145 - test how the update behaves with `exhaustMap` and with `switchMap`
    exhaustMap(payload =>
      this.occUserService
        .updateUserDetails(payload.username, payload.userDetails)
        .pipe(
          map(
            _ =>
              new fromUserDetailsAction.UpdateUserDetailsSuccess(
                payload.userDetails
              )
          ),
          catchError(error =>
            of(new fromUserDetailsAction.UpdateUserDetailsFail(error))
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
