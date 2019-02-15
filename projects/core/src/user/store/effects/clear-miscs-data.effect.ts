import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClearMiscsData } from '../actions/index';

@Injectable()
export class ClearMiscsDataEffect {
  @Effect()
  clearMiscsData$: Observable<Action> = this.actions$.pipe(
    ofType('[Site-context] Language Change', '[Site-context] Currency Change'),
    map(() => {
      return new ClearMiscsData();
    })
  );

  constructor(private actions$: Actions) {}
}
