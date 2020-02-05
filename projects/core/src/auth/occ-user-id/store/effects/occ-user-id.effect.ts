import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OCC_USER_ID_ANONYMOUS } from 'projects/core/src/occ';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGOUT } from '../../../store/actions/login-logout.action';
import { SetOccUserId } from '../actions/occ-user-id.action';

@Injectable()
export class OccUserIdEffect {
  @Effect()
  setToAnonymousOnLogout$: Observable<SetOccUserId> = this.actions$.pipe(
    ofType(LOGOUT),
    map(() => {
      return new SetOccUserId(OCC_USER_ID_ANONYMOUS);
    })
  );

  constructor(private actions$: Actions) {}
}
