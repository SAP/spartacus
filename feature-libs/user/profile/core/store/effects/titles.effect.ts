import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<UserActions.TitlesAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_TITLES),
    switchMap(() => {
      return this.userAccountConnector.getTitles().pipe(
        map((titles) => {
          return new UserActions.LoadTitlesSuccess(titles);
        }),
        catchError((error) =>
          of(new UserActions.LoadTitlesFail(normalizeHttpError(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserProfileConnector
  ) {}
}
