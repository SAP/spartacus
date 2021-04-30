import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError, UserAddressConnector } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class AddressVerificationEffect {
  @Effect()
  verifyAddress$: Observable<
    CheckoutActions.VerifyAddressSuccess | CheckoutActions.VerifyAddressFail
  > = this.actions$.pipe(
    ofType<CheckoutActions.VerifyAddress>(CheckoutActions.VERIFY_ADDRESS),
    map((action) => action.payload),
    mergeMap((payload) =>
      this.userAddressConnector.verify(payload.userId, payload.address).pipe(
        map((data) => new CheckoutActions.VerifyAddressSuccess(data)),
        catchError((error) =>
          of(new CheckoutActions.VerifyAddressFail(normalizeHttpError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAddressConnector: UserAddressConnector
  ) {}
}
