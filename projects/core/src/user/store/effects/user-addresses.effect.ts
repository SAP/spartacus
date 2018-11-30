import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../occ';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { AddressList } from '../../../occ-models';

@Injectable()
export class UserAddressesEffects {
  @Effect()
  loadUserAddresses$: Observable<any> = this.actions$.pipe(
    ofType(fromUserAddressesAction.LOAD_USER_ADDRESSES),
    map((action: fromUserAddressesAction.LoadUserAddresses) => action.payload),
    mergeMap(payload => {
      return this.occUserService.loadUserAddresses(payload).pipe(
        map((addressesList: AddressList) => {
          return new fromUserAddressesAction.LoadUserAddressesSuccess(
            addressesList.addresses
          );
        }),
        catchError(error =>
          of(new fromUserAddressesAction.LoadUserAddressesFail(error))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
