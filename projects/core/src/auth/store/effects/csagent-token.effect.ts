import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserToken } from '../../models/token-types.model';
import { UserAuthenticationTokenService } from '../../services/user-authentication/user-authentication-token.service';
import { AuthActions } from '../actions/index';

@Injectable()
export class CustomerSupportAgentTokenEffects {
  @Effect()
  loadCustomerSupportAgentToken$: Observable<
    AuthActions.CustomerSupportAgentTokenAction
  > = this.actions$.pipe(
    ofType(AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN),
    map((action: AuthActions.LoadCustomerSupportAgentToken) => action.payload),
    switchMap(({ userId, password }) =>
      this.userTokenService.loadToken(userId, password).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.expiration_time = date.toJSON();
          return new AuthActions.LoadCustomerSupportAgentTokenSuccess(token);
        }),
        catchError(error =>
          of(
            new AuthActions.LoadCustomerSupportAgentTokenFail(
              makeErrorSerializable(error)
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userTokenService: UserAuthenticationTokenService
  ) {}
}
