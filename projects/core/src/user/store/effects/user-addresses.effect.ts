import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, take } from 'rxjs/operators';

import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { AddressList, User } from '../../../occ/occ-models/index';
import {
  GlobalMessageService,
  GlobalMessageType
} from '../../../global-message/index';
import { UserService } from '../../facade/index';
import { OccUserService } from '../../occ/index';

@Injectable()
export class UserAddressesEffects {
  @Effect()
  loadUserAddresses$: Observable<
    fromUserAddressesAction.UserAddressesAction
  > = this.actions$.pipe(
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
  addUserAddress$: Observable<
    fromUserAddressesAction.UserAddressesAction
  > = this.actions$.pipe(
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
  updateUserAddress$: Observable<
    fromUserAddressesAction.UserAddressesAction
  > = this.actions$.pipe(
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
  deleteUserAddress$: Observable<
    fromUserAddressesAction.UserAddressesAction
  > = this.actions$.pipe(
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
      this.userService
        .get()
        .pipe(take(1))
        .subscribe(({ uid }: User) => {
          this.userService.loadAddresses(uid);
        });
    })
  );

  @Effect({ dispatch: false })
  showGlobalMessageOnAddSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.ADD_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.showGlobalMessage('New address was added successfully!');
    })
  );

  @Effect({ dispatch: false })
  showGlobalMessageOnUpdateSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.UPDATE_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.showGlobalMessage('Address updated successfully!');
    })
  );

  @Effect({ dispatch: false })
  showGlobalMessageOnDeleteSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.DELETE_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.showGlobalMessage('Address deleted successfully!');
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
    // ----------
    // todo: handle automatic removal of outdated messages
    this.messageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
    this.messageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
    // ----------

    this.messageService.add({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      text
    });
  }
}
