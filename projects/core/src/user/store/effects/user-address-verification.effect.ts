import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UserAddressVerificationEffect {
  @Effect()
  verifyAddress$: Observable<
    UserActions.VerifyUserAddressSuccess | UserActions.VerifyUserAddressFail
  > = this.actions$.pipe(
    ofType<UserActions.VerifyUserAddress>(UserActions.VERIFY_USER_ADDRESS),
    map((action) => action.payload),
    mergeMap((payload) =>
      this.userAddressConnector.verify(payload.userId, payload.address).pipe(
        map((data) => new UserActions.VerifyUserAddressSuccess(data)),
        catchError((error) =>
          of(new UserActions.VerifyUserAddressFail(normalizeHttpError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAddressConnector: UserAddressConnector
  ) {}
}
