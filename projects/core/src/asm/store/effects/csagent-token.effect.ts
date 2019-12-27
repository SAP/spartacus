import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserToken } from '../../../auth/models/token-types.model';
import { UserAuthenticationTokenService } from '../../../auth/services/user-authentication/user-authentication-token.service';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerSupportAgentTokenEffects {
  @Effect()
  loadCustomerSupportAgentToken$: Observable<
    AsmActions.CustomerSupportAgentTokenAction
  > = this.actions$.pipe(
    ofType(AsmActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN),
    map((action: AsmActions.LoadCustomerSupportAgentToken) => action.payload),
    switchMap(({ userId, password }) =>
      this.userTokenService.loadToken(userId, password).pipe(
        map((token: UserToken) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + token.expires_in);
          token.expiration_time = date.toJSON();
          return new AsmActions.LoadCustomerSupportAgentTokenSuccess(token);
        }),
        catchError(error =>
          of(
            new AsmActions.LoadCustomerSupportAgentTokenFail(
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
