import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';

@Injectable()
export class UpdateEmailEffects {
  constructor(
    private actions$: Actions,
    private userProfileConnector: UserProfileConnector
  ) {}

  @Effect()
  updateEmail$: Observable<
    | UserProfileActions.UpdateEmailSuccessAction
    | UserProfileActions.UpdateEmailErrorAction
  > = this.actions$.pipe(
    ofType(UserProfileActions.UPDATE_EMAIL),
    map((action: UserProfileActions.UpdateEmailAction) => action.payload),
    concatMap((payload) =>
      this.userProfileConnector
        .updateEmail(payload.uid, payload.password, payload.newUid)
        .pipe(
          map(
            () =>
              new UserProfileActions.UpdateEmailSuccessAction(payload.newUid)
          ),
          catchError((error) =>
            of(
              new UserProfileActions.UpdateEmailErrorAction(
                normalizeHttpError(error)
              )
            )
          )
        )
    )
  );
}
