import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccUserService } from '../../occ/user.service';
import * as fromActions from '../actions/user-consents.action';

@Injectable()
export class UserConsentsEffect {
  // TODO:#1184 - test
  @Effect()
  getConsents$: Observable<fromActions.UserConsentsAction> = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_CONSENTS),
    map((action: fromActions.LoadUserConsents) => action.payload),
    switchMap(userId =>
      this.occUserService.loadConsents(userId).pipe(
        map(consents => new fromActions.LoadUserConsentsSuccess(consents)),
        catchError(error => of(new fromActions.LoadUserConsentsFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
