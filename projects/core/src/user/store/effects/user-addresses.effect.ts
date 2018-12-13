import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../occ/index';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { AddressList } from '../../../occ/occ-models/index';

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

  @Effect()
  addUserAddress$: Observable<any> = this.actions$.pipe(
    ofType(fromUserAddressesAction.ADD_USER_ADDRESS),
    map((action: fromUserAddressesAction.AddUserAddress) => action.payload),
    mergeMap(payload => {
      return this.occUserService
        .addUserAddress(payload.userId, payload.address)
        .pipe(
          map((data: any) => {
            return new fromUserAddressesAction.AddUserAddressSuccess(data);
          }),
          catchError(error =>
            of(new fromUserAddressesAction.AddUserAddressFail(error))
          )
        );
    })
  );

  @Effect()
  updateUserAddress$: Observable<any> = this.actions$.pipe(
    ofType(fromUserAddressesAction.UPDATE_USER_ADDRESS),
    map((action: fromUserAddressesAction.UpdateUserAddress) => action.payload),
    mergeMap(payload => {
      return this.occUserService
        .updateUserAddress(payload.userId, payload.addressId, payload.address)
        .pipe(
          map((data: any) => {
            return new fromUserAddressesAction.UpdateUserAddressSuccess(data);
          }),
          catchError(error =>
            of(new fromUserAddressesAction.UpdateUserAddressFail(error))
          )
        );
    })
  );

  @Effect()
  deleteUserAddress$: Observable<any> = this.actions$.pipe(
    ofType(fromUserAddressesAction.DELETE_USER_ADDRESS),
    map((action: fromUserAddressesAction.DeleteUserAddress) => action.payload),
    mergeMap(payload => {
      return this.occUserService
        .deleteUserAddress(payload.userId, payload.addressId)
        .pipe(
          map((data: any) => {
            return new fromUserAddressesAction.DeleteUserAddressSuccess(data);
          }),
          catchError(error =>
            of(new fromUserAddressesAction.DeleteUserAddressFail(error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
