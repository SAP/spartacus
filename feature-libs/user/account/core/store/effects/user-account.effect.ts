import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserAccountConnector } from '../../connectors/user.connector';
import { User } from '../../model/user.model';
import { UserAccountAction } from '../actions/index';

@Injectable()
export class UserAccountEffects {
  @Effect()
  loadUserAccount$: Observable<
    UserAccountAction.UserAccountAction
  > = this.actions$.pipe(
    ofType(UserAccountAction.LOAD_USER_ACCOUNT),
    map((action: UserAccountAction.LoadUserAccount) => action.payload),
    mergeMap((userId) => {
      return this.userAccountConnector.get(userId).pipe(
        map((user: User) => {
          return new UserAccountAction.LoadUserAccountSuccess(user);
        }),
        catchError((error) =>
          of(
            new UserAccountAction.LoadUserAccountFail(normalizeHttpError(error))
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
