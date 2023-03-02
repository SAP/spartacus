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
  UserActions,
  UserAddressConnector,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class CdcUserAddressesEffects {
  addressFieldKeys = ['line1', 'line2', 'region.name', 'town', 'postalCode'];

  addUserAddress$: Observable<UserActions.UserAddressesAction> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ADD_USER_ADDRESS),
        map((action: UserActions.AddUserAddress) => action.payload),
        switchMap(() => {
          return this.updateDefaultAdressInCDC().pipe(
            map((data: any) => {
              return new UserActions.AddUserAddressSuccess(data);
            }),
            catchError((error) => {
              let errorMessage = error?.errorMessage || ' ';
              this.messageService.add(
                errorMessage,
                GlobalMessageType.MSG_TYPE_ERROR
              );
              return of(new UserActions.AddUserAddressFail(error));
            })
          );
        })
      )
  );

  updateUserAddress$: Observable<UserActions.UserAddressesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.UPDATE_USER_ADDRESS),
        map((action: UserActions.UpdateUserAddress) => action.payload),
        switchMap(() => {
          return this.updateDefaultAdressInCDC().pipe(
            map((data: any) => {
              return new UserActions.UpdateUserAddressSuccess(data);
            }),
            catchError((error) => {
              let errorMessage = error?.errorMessage || ' ';
              this.messageService.add(
                errorMessage,
                GlobalMessageType.MSG_TYPE_ERROR
              );
              return of(new UserActions.UpdateUserAddressFail(error));
            })
          );
        })
      )
    );

  deleteUserAddress$: Observable<UserActions.UserAddressesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_ADDRESS),
        map((action: UserActions.DeleteUserAddress) => action.payload),
        switchMap(() => {
          return this.updateDefaultAdressInCDC().pipe(
            map((data: any) => {
              return new UserActions.DeleteUserAddressSuccess(data);
            }),
            catchError((error) => {
              let errorMessage = error?.errorMessage || ' ';
              this.messageService.add(
                errorMessage,
                GlobalMessageType.MSG_TYPE_ERROR
              );
              return of(new UserActions.DeleteUserAddressFail(error));
            })
          );
        })
      )
    );

  getAddresses(): Observable<Address[]> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) => this.userAddressConnector.getAll(userId))
    );
  }

  getDefaultAddress(addresses: Address[]) {
    return addresses.find((address) => address?.defaultAddress === true);
  }

  updateDefaultAdressInCDC() {
    return this.getAddresses().pipe(
      take(1),
      switchMap((addresses: Address[]) => {
        let defaultAddress = this.getDefaultAddress(addresses) || {};
        return this.sendAddressToCDC(defaultAddress);
      })
    );
  }

  sendAddressToCDC(address: Address): Observable<{ status: string }> {
    //send to CDC
    let formattedAddress =
      address.formattedAddress || this.getFormattedAddress(address);
    return this.cdcJsService.updateAddressWithoutScreenSet(
      formattedAddress,
      address.postalCode,
      address.town,
      address.country?.name
    );
  }

  constructor(
    protected actions$: Actions,
    protected userIdService: UserIdService,
    protected userAddressConnector: UserAddressConnector,
    protected userAddressService: UserAddressService,
    protected messageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {}

  //Similar implementation of SingleLineAddressFormatPopulator.java
  getFormattedAddress(address: Address): string {
    let formattedAddress = ' ';
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
