/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  Address,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  UserActions,
  UserAddressConnector,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class CdcUserAddressesEffects {
  addressFieldKeys = ['line1', 'line2', 'region.name', 'town', 'postalCode'];

  cdcAddUserAddress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ADD_USER_ADDRESS_SUCCESS),
        mergeMap(() => this.updateDefaultAddressInCDC()),
        tap({
          error: (error) => this.showErrorMessage(error),
        })
      ),
    { dispatch: false }
  );

  cdcUpdateUserAddress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.UPDATE_USER_ADDRESS_SUCCESS),
        mergeMap(() => this.updateDefaultAddressInCDC()),
        tap({
          error: (error) => this.showErrorMessage(error),
        })
      ),
    { dispatch: false }
  );

  cdcDeleteUserAddress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.DELETE_USER_ADDRESS_SUCCESS),
        mergeMap(() => this.updateDefaultAddressInCDC()),
        tap({
          error: (error) => this.showErrorMessage(error),
        })
      ),
    { dispatch: false }
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

  getCountryName(countries: Country[], countryIsocode: string) {
    return countries.find((country) => country.isocode === countryIsocode)
      ?.name;
  }

  updateDefaultAddressInCDC() {
    return this.getAddresses().pipe(
      take(1),
      switchMap((addresses: Address[]) => {
        const defaultAddress = this.getDefaultAddress(addresses) || {};
        return this.sendAddressToCDC(defaultAddress);
      })
    );
  }

  sendAddressToCDC(address: Address): Observable<{ status: string }> {
    //send to CDC
    const formattedAddress = address.formattedAddress || ' ';
    return this.userAddressService.getDeliveryCountries().pipe(
      take(1),
      switchMap((countries: Country[]) => {
        const countryName =
          this.getCountryName(countries, address.country?.isocode || ' ') ||
          ' ';
        return this.cdcJsService.updateAddressWithoutScreenSet(
          formattedAddress,
          address.postalCode || ' ',
          address.town || ' ',
          countryName
        );
      })
    );
  }

  showErrorMessage(error: any) {
    const errorMessage = error?.errorMessage || ' ';
    this.messageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
  }

  constructor(
    protected actions$: Actions,
    protected userIdService: UserIdService,
    protected userAddressConnector: UserAddressConnector,
    protected userAddressService: UserAddressService,
    protected messageService: GlobalMessageService,
    protected cdcJsService: CdcJsService
  ) {}
}
