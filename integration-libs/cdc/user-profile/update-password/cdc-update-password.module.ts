/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  MyAccountV2PasswordComponentService,
  USE_MY_ACCOUNT_V2_PASSWORD,
  UpdatePasswordComponentService,
} from '@spartacus/user/profile/components';
import { CDCUpdatePasswordComponentService } from './cdc-update-password-component.service';

const myAccountV2PasswordWithCDCMapping: CmsConfig = {
  cmsComponents: {
    UpdatePasswordComponent: {
      providers: [
        {
          provide: MyAccountV2PasswordComponentService,
          useClass: CDCUpdatePasswordComponentService,
        },
      ],
    },
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    UrlModule,
    RouterModule,
    PasswordVisibilityToggleModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: {
          providers: [
            {
              provide: UpdatePasswordComponentService,
              useClass: CDCUpdatePasswordComponentService,
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_PASSWORD)
        ? myAccountV2PasswordWithCDCMapping
        : {}
    ),
  ],
})
export class CDCUpdatePasswordModule {}
