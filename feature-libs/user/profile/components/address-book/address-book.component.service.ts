/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Address, UserActions, UserAddressService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressBookComponentService {
  constructor(
    protected userAddressService: UserAddressService,
    protected actions$: Actions
  ) {}

  getAddresses(): Observable<Address[]> {
    return this.userAddressService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userAddressService.getAddressesLoading();
  }

  loadAddresses() {
    this.userAddressService.loadAddresses();
  }

  addUserAddress(address: Address) {
    this.userAddressService.addUserAddress(address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.userAddressService.updateUserAddress(addressId, address);
  }

  setAddressAsDefault(addressId: string): void {
    this.userAddressService.setAddressAsDefault(addressId);
  }

  deleteUserAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
  }

  getAddUserAddressSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(UserActions.ADD_USER_ADDRESS_SUCCESS),
      map(() => undefined)
    );
  }

  getAddUserAddressFail(): Observable<void> {
    return this.actions$.pipe(
      ofType(UserActions.ADD_USER_ADDRESS_FAIL),
      map(() => undefined)
    );
  }

  getUpdateUserAddressSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(UserActions.UPDATE_USER_ADDRESS_SUCCESS),
      map(() => undefined)
    );
  }

  getUpdateUserAddressFail(): Observable<void> {
    return this.actions$.pipe(
      ofType(UserActions.UPDATE_USER_ADDRESS_FAIL),
      map(() => undefined)
    );
  }
}
