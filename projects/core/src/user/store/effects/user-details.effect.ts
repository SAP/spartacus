import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
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

  @Effect()
  updateUserDetails$: Observable<
    UserActions.UpdateUserDetailsSuccess | UserActions.UpdateUserDetailsFail
  > = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER_DETAILS),
    map((action: UserActions.UpdateUserDetails) => action.payload),
    concatMap((payload) =>
      this.userConnector.update(payload.username, payload.userDetails).pipe(
        map(
          () => new UserActions.UpdateUserDetailsSuccess(payload.userDetails)
        ),
        catchError((error) =>
          of(new UserActions.UpdateUserDetailsFail(normalizeHttpError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
