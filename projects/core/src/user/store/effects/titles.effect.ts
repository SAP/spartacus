import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromAction from '../actions/titles.action';
import { Title } from '../../../model/misc.model';
import { UserAccountConnector } from '../../connectors/account/user-account.connector';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<fromAction.TitlesAction> = this.actions$.pipe(
    ofType(fromAction.LOAD_TITLES),
    switchMap(() => {
      return this.userAccountConnector.getTitles().pipe(
        map(titles => {
          const sortedTitles = this.sortTitles(titles);
          return new fromAction.LoadTitlesSuccess(sortedTitles);
        }),
        catchError(error => of(new fromAction.LoadTitlesFail(error)))
      );
    })
  );

  private sortTitles(titles: Title[]) {
    const drTitle = { code: 'dr', name: 'Dr.' };
    const revTitle = { code: 'rev', name: 'Rev.' };

    const filteredTitles = titles.filter(
      t => t.code !== 'dr' && t.code !== 'rev'
    );
    const sortedTitles = [...filteredTitles, drTitle, revTitle];
    return sortedTitles;
  }

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserAccountConnector
  ) {}
}
