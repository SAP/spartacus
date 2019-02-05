import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/titles.action';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<fromAction.TitlesAction> = this.actions$.pipe(
    ofType(fromAction.LOAD_TITLES),
    switchMap(() => {
      return this.occMiscsService.loadTitles().pipe(
        map(data => new fromAction.LoadTitlesSuccess(data.titles)),
        catchError(error => of(new fromAction.LoadTitlesFail(error)))
      );
    })
  );

  @Effect()
  resetTitles$: Observable<Action> = this.actions$.pipe(
    ofType('[Site-context] Language Change', '[Site-context] Currency Change'),
    map(() => {
      return new fromAction.ResetTitles();
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
