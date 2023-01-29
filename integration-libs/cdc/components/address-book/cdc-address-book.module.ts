/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  CmsConfig, 
  GlobalMessageService, 
  provideDefaultConfig,
  UserAddressService
} from '@spartacus/core';
import { AddressBookComponent, AddressBookComponentService } from '@spartacus/storefront';
import { CDCAddressBookComponentService } from './cdc-address-book.component.service';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          component: AddressBookComponent,
          providers: [
            {
              provide: AddressBookComponentService,
              useClass: CDCAddressBookComponentService,
              deps: [
                UserAddressService,
                GlobalMessageService,
                CdcJsService
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCAddressBookModule { }
