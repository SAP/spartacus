import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions/index';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class RegionsEffects {
  @Effect()
  loadRegions$: Observable<fromActions.RegionsAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_REGIONS),
    map((action: fromActions.LoadRegions) => {
      return action.payload;
    }),
    switchMap((countryCode: string) => {
      return this.occMiscsService.loadRegions(countryCode).pipe(
        map(data => new fromActions.LoadRegionsSuccess(data.regions)),
        catchError(error => of(new fromActions.LoadRegionsFail(error)))
      );
    })
  );

  @Effect()
  resetRegions$: Observable<Action> = this.actions$.pipe(
    ofType('[Site-context] Language Change', '[Site-context] Currency Change'),
    map(() => {
      return new fromActions.ResetRegions();
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
