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

  // @Effect()
  // updateUserDetails$: Observable<
  //   UserActions.UpdateUserDetailsSuccess | UserActions.UpdateUserDetailsFail
  // > = this.actions$.pipe(
  //   ofType(UserActions.UPDATE_USER_DETAILS),
  //   map((action: UserActions.UpdateUserDetails) => action.payload),
  //   concatMap((payload) =>
  //     this.userConnector.update(payload.username, payload.userDetails).pipe(
  //       map(
  //         () => new UserActions.UpdateUserDetailsSuccess(payload.userDetails)
  //       ),
  //       catchError((error) =>
  //         of(new UserActions.UpdateUserDetailsFail(normalizeHttpError(error)))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private userConnector: UserConnector
  ) {}
}
