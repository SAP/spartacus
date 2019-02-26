import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClearMiscsData } from '../actions/index';
import { CURRENCY_CHANGE } from '../../../site-context/store/actions/currencies.action';
import { LANGUAGE_CHANGE } from '../../../site-context/store/actions/languages.action';

@Injectable()
export class ClearMiscsDataEffect {
  @Effect()
  clearMiscsData$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGE, CURRENCY_CHANGE),
    map(() => {
      return new ClearMiscsData();
    })
  );

  constructor(private actions$: Actions) {}
}
