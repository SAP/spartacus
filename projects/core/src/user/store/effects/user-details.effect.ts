import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from '../../../model/misc.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<UserActions.UserDetailsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_DETAILS),
    map((action: UserActions.LoadUserDetails) => action.payload),
    mergeMap((userId) => {
      return this.userConnector.get(userId).pipe(
        map((user: User) => {
          return new UserActions.LoadUserDetailsSuccess(user);
        }),
        catchError((error) =>
          of(new UserActions.LoadUserDetailsFail(normalizeHttpError(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
