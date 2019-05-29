import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { OpenIdAuthenticationTokenService } from '../../services/open-id-token/open-id-token.service';
import * as fromActions from '../actions/open-id-token.action';

@Injectable()
export class OpenIdTokenEffect {
  @Effect()
  loadOpenIdToken$: Observable<
    fromActions.OpenIdTokenActions
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_OPEN_ID_TOKEN),
    map((action: fromActions.LoadOpenIdToken) => action.payload),
    exhaustMap(payload => {
      return this.openIdTokenService
        .loadOpenIdAuthenticationToken(payload.username, payload.password)
        .pipe(
          map(token => new fromActions.LoadOpenIdTokenSuccess(token)),
          catchError(error => of(new fromActions.LoadOpenIdTokenFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private openIdTokenService: OpenIdAuthenticationTokenService
  ) {}
}
