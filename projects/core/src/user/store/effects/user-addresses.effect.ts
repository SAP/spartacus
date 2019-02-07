import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { OccUserService } from '../../occ/index';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { AddressList, User } from '../../../occ/occ-models/index';
import {
  GlobalMessageService,
  GlobalMessageType
} from '../../../global-message/index';
import { UserService } from '../../facade/index';

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
            this.notifyAboutAddSuccess();

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
            this.notifyAboutUpdateSuccess();

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
            this.notifyAboutDeleteSuccess();

            return new fromUserAddressesAction.DeleteUserAddressSuccess(data);
          }),
          catchError(error =>
            of(new fromUserAddressesAction.DeleteUserAddressFail(error))
          )
        );
    })
  );

  /**
   *  Reload addresses on success actions (add, update and delete user address)
   */
  @Effect({ dispatch: false })
  reloadAddressesOnActionsSuccess$ = this.actions$.pipe(
    ofType(
      fromUserAddressesAction.ADD_USER_ADDRESS_SUCCESS,
      fromUserAddressesAction.UPDATE_USER_ADDRESS_SUCCESS,
      fromUserAddressesAction.DELETE_USER_ADDRESS_SUCCESS
    ),
    tap(() => {
      this.userService.get().pipe(
        map(({ uid }: User) => {
          this.userService.loadAddresses(uid);
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService,
    private userService: UserService,
    private messageService: GlobalMessageService
  ) {}

  /**
   * Show global confirmation message with provided text
   */
  private showGlobalMessage(text: string) {
    this.messageService.add({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      text
    });
  }

  private notifyAboutAddSuccess() {
    this.showGlobalMessage('New address was added successfully!');
  }

  private notifyAboutUpdateSuccess() {
    this.showGlobalMessage('Address updated successfully!');
  }

  private notifyAboutDeleteSuccess() {
    this.showGlobalMessage('Address deleted successfully!');
  }
}
