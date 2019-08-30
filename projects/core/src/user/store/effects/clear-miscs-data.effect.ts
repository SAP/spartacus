import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { UserActions } from '../actions/index';

@Injectable()
export class ClearMiscsDataEffect {
  @Effect()
  clearMiscsData$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    map(() => {
      return new UserActions.ClearUserMiscsData();
    })
  );

  constructor(private actions$: Actions) {}
}
