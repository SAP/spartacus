import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<UserActions.TitlesAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_TITLES),
    switchMap(() => {
      return this.userAccountConnector.getTitles().pipe(
        map(titles => {
          return new UserActions.LoadTitlesSuccess(titles);
        }),
        catchError(error =>
          of(new UserActions.LoadTitlesFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}
}
