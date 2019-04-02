import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OccUserService } from '../../occ/index';
import * as fromActions from '../actions/update-password.action';

@Injectable()
export class UpdatePasswordEffects {
  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}

  @Effect()
  updatePassword$: Observable<
    fromActions.UpdatePasswordSuccess | fromActions.UpdatePasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_PASSWORD),
    map((action: fromActions.UpdatePassword) => action.payload),
    concatMap(payload =>
      this.occUserService
        .updatePassword(
          payload.userId,
          payload.oldPassword,
          payload.newPassword
        )
        .pipe(
          map(_ => new fromActions.UpdatePasswordSuccess()),
          catchError(error => of(new fromActions.UpdatePasswordFail(error)))
        )
    )
  );
}
