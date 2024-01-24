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
  MyAccountV2EmailComponentService,
  USE_MY_ACCOUNT_V2_EMAIL,
  UpdateEmailComponentService,
} from '@spartacus/user/profile/components';
import { CDCUpdateEmailComponentService } from './cdc-update-email-component.service';

const myAccountV2EmailWithCDCMapping: CmsConfig = {
  cmsComponents: {
    UpdateEmailComponent: {
      providers: [
        {
          provide: MyAccountV2EmailComponentService,
          useClass: CDCUpdateEmailComponentService,
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
    UrlModule,
    RouterModule,
    I18nModule,
    FormErrorsModule,
    PasswordVisibilityToggleModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdateEmailComponent: {
          providers: [
            {
              provide: UpdateEmailComponentService,
              useClass: CDCUpdateEmailComponentService,
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_EMAIL) ? myAccountV2EmailWithCDCMapping : {}
    ),
  ],
})
export class CDCUpdateEmailModule {}
