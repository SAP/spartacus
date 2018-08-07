import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromAction from '../actions/address-verification.action';
import { OccUserService } from '../../../occ/user/user.service';

@Injectable()
export class AddressVerificationEffect {
  @Effect()
  verifyAddress$: Observable<any> = this.actions$
    .ofType(fromAction.VERIFY_ADDRESS)
    .pipe(
      map((action: any) => action.payload),
      mergeMap(payload =>
        this.occUserService.verifyAddress(payload.userId, payload.address).pipe(
          map(data => {
            return new fromAction.VerifyAddressSuccess(data);
          }),
          catchError(error => of(new fromAction.VerifyAddressFail(error)))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
