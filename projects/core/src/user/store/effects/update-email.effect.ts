import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OccUserService } from '../../occ/index';
import * as fromUpdateEmailAction from '../actions/update-email.action';

@Injectable()
export class UpdateEmailEffects {
  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}

  @Effect()
  updateEmail$: Observable<
    | fromUpdateEmailAction.UpdateEmailSuccessAction
    | fromUpdateEmailAction.UpdateEmailErrorAction
  > = this.actions$.pipe(
    ofType(fromUpdateEmailAction.UPDATE_EMAIL),
    map((action: fromUpdateEmailAction.UpdateEmailAction) => action.payload),
    concatMap(payload =>
      this.occUserService
        .updateEmail(payload.uid, payload.password, payload.newUid)
        .pipe(
          map(
            () =>
              new fromUpdateEmailAction.UpdateEmailSuccessAction(payload.newUid)
          ),
          catchError(error =>
            of(new fromUpdateEmailAction.UpdateEmailErrorAction(error))
          )
        )
    )
  );
}
