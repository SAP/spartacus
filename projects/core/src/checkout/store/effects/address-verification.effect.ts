import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserAddressConnector } from '../../../user/connectors/address/user-address.connector';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import * as fromAction from '../actions/address-verification.action';

@Injectable()
export class AddressVerificationEffect {
  @Effect()
  verifyAddress$: Observable<
    fromAction.VerifyAddressSuccess | fromAction.VerifyAddressFail
  > = this.actions$.pipe(
    ofType<fromAction.VerifyAddress>(fromAction.VERIFY_ADDRESS),
    map(action => action.payload),
    mergeMap(payload =>
      this.userAddressConnector.verify(payload.userId, payload.address).pipe(
        map(data => new fromAction.VerifyAddressSuccess(data)),
        catchError(error =>
          of(new fromAction.VerifyAddressFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userAddressConnector: UserAddressConnector
  ) {}
}
