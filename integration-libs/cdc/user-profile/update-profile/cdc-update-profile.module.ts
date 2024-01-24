/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  MyAccountV2ProfileComponentService,
  USE_MY_ACCOUNT_V2_PROFILE,
  UpdateProfileComponentService,
} from '@spartacus/user/profile/components';
import { CDCUpdateProfileComponentService } from './cdc-update-profile-component.service';

const myAccountV2ProfileWithCDCMapping: CmsConfig = {
  cmsComponents: {
    UpdateProfileComponent: {
      providers: [
        {
          provide: MyAccountV2ProfileComponentService,
          useClass: CDCUpdateProfileComponentService,
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
    RouterModule,
    UrlModule,
    NgSelectModule,
    NgSelectA11yModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          providers: [
            {
              provide: UpdateProfileComponentService,
              useClass: CDCUpdateProfileComponentService,
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_PROFILE) ? myAccountV2ProfileWithCDCMapping : {}
    ),
  ],
})
export class CDCUpdateProfileModule {}
