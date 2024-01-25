/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UserAddressService,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { AddressBookComponent } from './address-book.component';
import { AddressFormModule } from './address-form/address-form.module';
import { defaultSuggestedAddressesDialogLayoutConfig } from './address-form/suggested-addresses-dialog/default-suggested-addresses-dialog-layout.config';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    AddressFormModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [AddressBookComponent],
  exports: [AddressBookComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          component: AddressBookComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(defaultSuggestedAddressesDialogLayoutConfig),
    UserAddressService,
  ],
})
export class AddressBookModule {}
