import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserAddressConnector } from '../../../user/connectors/address/user-address.connector';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class AddressVerificationEffect {
  @Effect()
  verifyAddress$: Observable<
    CheckoutActions.VerifyAddressSuccess | CheckoutActions.VerifyAddressFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.VERIFY_ADDRESS),
    map((action: any) => action.payload),
    mergeMap(payload =>
      this.userAddressConnector.verify(payload.userId, payload.address).pipe(
        map(data => {
          return new CheckoutActions.VerifyAddressSuccess(data);
        }),
        catchError(error => of(new CheckoutActions.VerifyAddressFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAddressConnector: UserAddressConnector
  ) {}
}
