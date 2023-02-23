/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
  UserActions,
  UserAddressConnector,
  UserAddressService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class CdcUserAddressesEffects {
  addressFieldKeys = ['line1', 'line2', 'region.name', 'town', 'postalCode'];

  loadUserAddresses$: Observable<UserActions.UserAddressesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.LOAD_USER_ADDRESSES),
        map((action: UserActions.LoadUserAddresses) => action.payload),
        mergeMap((payload) => {
          return this.userAddressConnector.getAll(payload).pipe(
            tap((addresses) => {
              for (let address of addresses) {
                if (address.defaultAddress) {
                  this.sendAddressToCDC(address);
                  break;
                }
              }
            }),
            map((addresses: Address[]) => {
              return new UserActions.LoadUserAddressesSuccess(addresses);
            }),
            catchError((error) =>
              of(
                new UserActions.LoadUserAddressesFail(normalizeHttpError(error))
              )
            )
          );
        })
      )
    );

  addUserAddress$: Observable<UserActions.UserAddressesAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ADD_USER_ADDRESS),
        map((action: UserActions.AddUserAddress) => action.payload),
        mergeMap((payload) => {
          if (payload.address && payload.address.defaultAddress) {
            this.sendAddressToCDC(payload.address);
          }
          return this.userAddressConnector
            .add(payload.userId, payload.address)
            .pipe(
              map((data: any) => {
                return new UserActions.AddUserAddressSuccess(data);
              }),
              catchError((error) =>
                of(
                  new UserActions.AddUserAddressFail(normalizeHttpError(error))
                )
              )
            );
        })
      )
  );

  updateUserAddress$: Observable<UserActions.UserAddressesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.UPDATE_USER_ADDRESS),
        map((action: UserActions.UpdateUserAddress) => action.payload),
        mergeMap((payload) => {
          return this.userAddressConnector
            .update(payload.userId, payload.addressId, payload.address)
            .pipe(
              map((data) => {
                // don't show the message if just setting address as default
                if (
                  payload.address &&
                  Object.keys(payload.address).length === 1 &&
                  payload.address.defaultAddress
                ) {
                  return new UserActions.LoadUserAddresses(payload.userId);
                } else {
                  if (payload.address && payload.address.defaultAddress) {
                    this.sendAddressToCDC(payload.address);
                  }
                  return new UserActions.UpdateUserAddressSuccess(data);
                }
              }),
              catchError((error) =>
                of(
                  new UserActions.UpdateUserAddressFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  deleteUserAddress$: Observable<UserActions.UserAddressesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_ADDRESS),
        map((action: UserActions.DeleteUserAddress) => action.payload),
        mergeMap((payload) => {
          if (payload.address && payload.address.defaultAddress) {
            this.sendAddressToCDC({});
          }
          return this.userAddressConnector
            .delete(payload.userId, payload.addressId)
            .pipe(
              map((data) => {
                return new UserActions.DeleteUserAddressSuccess(data);
              }),
              catchError((error) =>
                of(
                  new UserActions.DeleteUserAddressFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  /**
   *  Reload addresses and notify about add success
   */

  showGlobalMessageOnAddSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ADD_USER_ADDRESS_SUCCESS),
        tap(() => {
          this.loadAddresses();
          this.showGlobalMessage('addressForm.userAddressAddSuccess');
        })
      ),
    { dispatch: false }
  );

  /**
   *  Reload addresses and notify about update success
   */

  showGlobalMessageOnUpdateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.UPDATE_USER_ADDRESS_SUCCESS),
        tap(() => {
          this.loadAddresses();
          this.showGlobalMessage('addressForm.userAddressUpdateSuccess');
        })
      ),
    { dispatch: false }
  );

  /**
   *  Reload addresses and notify about delete success
   */

  showGlobalMessageOnDeleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_ADDRESS_SUCCESS),
        tap(() => {
          this.loadAddresses();
          this.showGlobalMessage('addressForm.userAddressDeleteSuccess');
        })
      ),
    { dispatch: false }
  );

  sendAddressToCDC(address: Address) {
    //send to CDC
    let formattedAddress =
      address.formattedAddress || this.getFormattedAddress(address);
    this.cdcJsService
      .updateAddressWithoutScreenSet(
        formattedAddress,
        address.postalCode,
        address.town,
        address.country?.name
      )
      .subscribe({
        error: (error: { errorMessage: string }) => {
          let errorMessage = error?.errorMessage || ' ';
          this.messageService.add(
            errorMessage,
            GlobalMessageType.MSG_TYPE_ERROR
          );
        },
      });
  }

  constructor(
    protected actions$: Actions,
    protected userAddressConnector: UserAddressConnector,
    protected userAddressService: UserAddressService,
    protected messageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {}

  /**
   * Show global confirmation message with provided text
   */
  private showGlobalMessage(text: string) {
    this.messageService.add(
      { key: text },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  private loadAddresses() {
    this.userAddressService.loadAddresses();
  }

  //Similar implementation of SingleLineAddressFormatPopulator.java
  getFormattedAddress(address: Address): string {
    let formattedAddress = '';
    let addressComponents: Array<string> = [];

    this.addressFieldKeys.forEach((addressField) => {
      //obtain the value of a composite key
      let nestedFields = addressField.split('.');
      let fieldValue = address as { [key: string]: any };
      nestedFields.forEach((field) => {
        if (fieldValue && fieldValue.hasOwnProperty(field)) {
          fieldValue = fieldValue[field];
        }
      });
      if (typeof fieldValue === 'string') {
        addressComponents.push(fieldValue);
      }
    });

    formattedAddress = addressComponents.join(', ');
    return formattedAddress;
  }
}
