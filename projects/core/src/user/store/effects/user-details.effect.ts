import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { LOGIN } from '../../../auth/store/actions/login-logout.action';
import { User } from '../../../model/misc.model';
import { UserDetailsConnector } from '../../connectors/details/user-details.connector';
import * as fromUserDetailsAction from '../actions/user-details.action';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<
    fromUserDetailsAction.UserDetailsAction
  > = this.actions$.pipe(
    ofType(fromUserDetailsAction.LOAD_USER_DETAILS),
    map((action: fromUserDetailsAction.LoadUserDetails) => action.payload),
    mergeMap(userId => {
      return this.userDetailsConnector.get(userId).pipe(
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
  loadUserDetailsOnLogin$: Observable<
    fromUserDetailsAction.UserDetailsAction
  > = this.actions$.pipe(
    ofType(LOGIN),
    map(_ => {
      return new fromUserDetailsAction.LoadUserDetails('current');
    })
  );

  @Effect()
  updateUserDetails$: Observable<
    | fromUserDetailsAction.UpdateUserDetailsSuccess
    | fromUserDetailsAction.UpdateUserDetailsFail
  > = this.actions$.pipe(
    ofType(fromUserDetailsAction.UPDATE_USER_DETAILS),
    map((action: fromUserDetailsAction.UpdateUserDetails) => action.payload),
    concatMap(payload =>
      this.userDetailsConnector
        .update(payload.username, payload.userDetails)
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
    private userDetailsConnector: UserDetailsConnector
  ) {}
}
