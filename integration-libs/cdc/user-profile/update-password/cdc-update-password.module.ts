/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { CDCUpdatePasswordComponentService } from './cdc-update-password-component.service';

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
  ],
})
export class CDCUpdatePasswordModule {}
