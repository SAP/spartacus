import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<UserProfileActions.TitlesAction> = this.actions$.pipe(
    ofType(UserProfileActions.LOAD_TITLES),
    switchMap(() => {
      return this.userAccountConnector.getTitles().pipe(
        map((titles) => {
          return new UserProfileActions.LoadTitlesSuccess(titles);
        }),
        catchError((error) =>
          of(new UserProfileActions.LoadTitlesFail(normalizeHttpError(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserProfileConnector
  ) {}
}
