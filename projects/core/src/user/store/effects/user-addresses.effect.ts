import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message/index';
import { Address } from '../../../model/address.model';
import { UserAddressConnector } from '../../connectors/address/user-address.connector';
import { UserService } from '../../facade/index';
import * as fromUserAddressesAction from '../actions/user-addresses.action';

@Injectable()
export class UserAddressesEffects {
  @Effect()
  loadUserAddresses$: Observable<
    fromUserAddressesAction.UserAddressesAction
  > = this.actions$.pipe(
    ofType(fromUserAddressesAction.LOAD_USER_ADDRESSES),
    map((action: fromUserAddressesAction.LoadUserAddresses) => action.payload),
    mergeMap(payload => {
      return this.userAddressConnector.getAll(payload).pipe(
        map((addresses: Address[]) => {
          return new fromUserAddressesAction.LoadUserAddressesSuccess(
            addresses
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
      return this.userAddressConnector
        .add(payload.userId, payload.address)
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
      return this.userAddressConnector
        .update(payload.userId, payload.addressId, payload.address)
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
      return this.userAddressConnector
        .delete(payload.userId, payload.addressId)
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
   *  Reload addresses and notify about add success
   */
  @Effect({ dispatch: false })
  showGlobalMessageOnAddSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.ADD_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.loadAddresses();
      this.showGlobalMessage('addressForm.userAddressAddSuccess');
    })
  );

  /**
   *  Reload addresses and notify about update success
   */
  @Effect({ dispatch: false })
  showGlobalMessageOnUpdateSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.UPDATE_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.loadAddresses();
      this.showGlobalMessage('addressForm.userAddressUpdateSuccess');
    })
  );

  /**
   *  Reload addresses and notify about delete success
   */
  @Effect({ dispatch: false })
  showGlobalMessageOnDeleteSuccess$ = this.actions$.pipe(
    ofType(fromUserAddressesAction.DELETE_USER_ADDRESS_SUCCESS),
    tap(() => {
      this.loadAddresses();
      this.showGlobalMessage('addressForm.userAddressDeleteSuccess');
    })
  );

  constructor(
    private actions$: Actions,
    private userAddressConnector: UserAddressConnector,
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

    this.messageService.add(
      { key: text },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  private loadAddresses() {
    this.userService.loadAddresses();
  }
}
