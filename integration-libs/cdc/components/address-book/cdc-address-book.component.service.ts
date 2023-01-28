/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address, UserAddressService } from '@spartacus/core';
import { AddressBookComponentService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CdcJsService } from '../../root/service/cdc-js.service';

@Injectable()
export class CDCAddressBookComponentService extends  AddressBookComponentService{
  constructor(protected userAddressService: UserAddressService, protected cdcJsService: CdcJsService) {
    super(userAddressService);
  }
  
  protected addresses$: Observable<Address[]>

  getAddresses(): Observable<Address[]> {
    this.addresses$ =  this.userAddressService.getAddresses();
    this.addresses$.subscribe( (addresses: Address[]) => {
      for(let address of addresses) {
        if(address.defaultAddress) {
          //send to CDC
          let formattedAddress = address.formattedAddress || '';
          this.cdcJsService.updateAddressWithoutScreenSet(formattedAddress);
          break;
        }
      }
    });
    return this.addresses$;
  }
}
