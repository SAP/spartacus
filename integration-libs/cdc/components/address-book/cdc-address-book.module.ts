/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UserAddressService
} from '@spartacus/core';
import { AddressBookComponentService, AddressFormModule, CardModule, SpinnerModule } from '@spartacus/storefront';
import { CDCAddressBookComponentService } from './cdc-address-book.component.service';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    AddressFormModule,
    SpinnerModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AddressBookComponent: {
         providers: [
          {
            provide: AddressBookComponentService,
            useClass: CDCAddressBookComponentService,
            deps: [
              UserAddressService,
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
