import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserAddressesAction from '../actions/user-addresses.action';

@Injectable()
export class UserAddressesEffects {
  @Effect()
  loadUserAddresses$: Observable<any> = this.actions$
    .ofType(fromUserAddressesAction.LOAD_USER_ADDRESSES)
    .pipe(
      map(
        (action: fromUserAddressesAction.LoadUserAddresses) => action.payload
      ),
      mergeMap(payload => {
        return this.occUserService.loadUserAddresses(payload).pipe(
          map((addressesList: any) => {
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
