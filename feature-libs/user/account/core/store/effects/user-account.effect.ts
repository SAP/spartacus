import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserAccountConnector } from '../../connectors/user-account.connector';
import { User } from '@spartacus/user/account/root';
import { UserAccountActions } from '../actions/index';

@Injectable()
export class UserAccountEffects {
  @Effect()
  loadUserAccount$: Observable<
    UserAccountActions.UserAccountAction
  > = this.actions$.pipe(
    ofType(UserAccountActions.LOAD_USER_ACCOUNT),
    map((action: UserAccountActions.LoadUserAccount) => action.payload),
    mergeMap((userId) => {
      return this.userAccountConnector.get(userId).pipe(
        map((user: User) => {
          return new UserAccountActions.LoadUserAccountSuccess(user);
        }),
        catchError((error) =>
          of(
            new UserAccountActions.LoadUserAccountFail(
              normalizeHttpError(error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserAccountConnector
  ) {}
}
