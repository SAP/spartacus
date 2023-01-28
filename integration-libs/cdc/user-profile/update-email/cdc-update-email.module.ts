/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService, CdcLogoutGuard } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule
} from '@spartacus/core';
import {
  FormErrorsModule, LogoutGuard, PasswordVisibilityToggleModule, SpinnerModule
} from '@spartacus/storefront';
import { UpdateEmailComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { CDCUpdateEmailComponentService } from './cdc-update-email-component.service';

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
            { provide: LogoutGuard, useExisting: CdcLogoutGuard },
            {
              provide: UpdateEmailComponentService,
              useClass: CDCUpdateEmailComponentService,
              deps: [
                UserEmailFacade,
                RoutingService,
                GlobalMessageService,
                AuthService,
                AuthRedirectService,
                CdcJsService
              ],
            },
          ],
        },
      },
    }),
  ]
})
export class CDCUpdateEmailModule {}
