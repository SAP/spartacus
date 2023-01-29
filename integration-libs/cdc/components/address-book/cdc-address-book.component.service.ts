/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address, GlobalMessageService, GlobalMessageType, UserAddressService } from '@spartacus/core';
import { AddressBookComponentService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CdcJsService } from '../../root/service/cdc-js.service';

@Injectable()
export class CDCAddressBookComponentService extends  AddressBookComponentService{
  constructor(protected userAddressService: UserAddressService, protected globalMessageService: GlobalMessageService, protected cdcJsService: CdcJsService) {
    super(userAddressService);
  }

  protected addresses$: Observable<Address[]>;
  
  getAddresses(): Observable<Address[]> {
    this.addresses$ =  this.userAddressService.getAddresses();
    this.addresses$.subscribe( (addresses: Address[]) => {
      for(let address of addresses) {
        if(address.defaultAddress) {
          //send to CDC
          let formattedAddress = address.formattedAddress || '';
          this.cdcJsService.updateAddressWithoutScreenSet(formattedAddress).subscribe({
            error: (error) =>  {
              let errorMessage = error?.errorDetails || ' ';
              this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
            }
          });
          break;
        }
      }
    });
    return this.addresses$;
  }
}
