import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import * as fromAction from '../actions/card-types.action';

@Injectable()
export class CardTypesEffects {
  @Effect()
  loadCartTypes$: Observable<any> = this.actions$
    .ofType(fromAction.LOAD_CARD_TYPES)
    .pipe(
      switchMap(() => {
        return this.occMiscsService
          .loadCartTypes()
          .pipe(
            map(data => new fromAction.LoadCardTypesSuccess(data.cardTypes)),
            catchError(error => of(new fromAction.LoadCardTypesFail(error)))
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
