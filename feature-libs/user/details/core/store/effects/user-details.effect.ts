import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserConnector } from '../../connectors/user.connector';
import { User } from '../../model/user.model';
import { UserDetailAction } from '../actions/index';

@Injectable()
export class UserDetailsEffects {
  @Effect()
  loadUserDetails$: Observable<
    UserDetailAction.UserDetailsAction
  > = this.actions$.pipe(
    ofType(UserDetailAction.LOAD_USER_DETAILS),
    map((action: UserDetailAction.LoadUserDetails) => action.payload),
    mergeMap((userId) => {
      return this.userConnector.get(userId).pipe(
        map((user: User) => {
          return new UserDetailAction.LoadUserDetailsSuccess(user);
        }),
        catchError((error) =>
          of(
            new UserDetailAction.LoadUserDetailsFail(normalizeHttpError(error))
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
