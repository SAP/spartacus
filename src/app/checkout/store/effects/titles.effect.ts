import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import * as fromAction from '../actions/titles.action';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<any> = this.actions$
    .ofType(fromAction.LOAD_TITLES)
    .pipe(
      switchMap(() => {
        return this.occMiscsService
          .loadTitles()
          .pipe(
            map(data => new fromAction.LoadTitlesSuccess(data.titles)),
            catchError(error => of(new fromAction.LoadTitlesFail(error)))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
