/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule
} from '@spartacus/core';
import {
  FormErrorsModule, PasswordVisibilityToggleModule, SpinnerModule
} from '@spartacus/storefront';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
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
              deps: [UserPasswordFacade, RoutingService, GlobalMessageService, CdcJsService],
            },
          ],
        },
      },
    }),
  ]
})
export class CDCUpdatePasswordModule {}
