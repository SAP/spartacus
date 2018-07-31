import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class RegionsEffects {
  @Effect()
  loadRegions$: Observable<any> = this.actions$
    .ofType(fromActions.LOAD_REGIONS)
    .pipe(
      map((action: fromActions.LoadRegions) => {
        return action.countryCode;
      }),
      switchMap((countryCode: string) => {
        return this.occMiscsService.loadRegions(countryCode).pipe(
          map(data => new fromActions.LoadRegionsSuccess(data.regions)),
          catchError(error => of(new fromActions.LoadRegionsFail(error)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
