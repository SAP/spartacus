/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthConfigService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import {
  ForgotPasswordComponent,
  ForgotPasswordComponentService,
} from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { CDCForgotPasswordComponentService } from './cdc-forgot-password-component.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ForgotPasswordComponent: {
          component: ForgotPasswordComponent,
          providers: [
            {
              provide: ForgotPasswordComponentService,
              useClass: CDCForgotPasswordComponentService,
              deps: [
                UserPasswordFacade,
                RoutingService,
                AuthConfigService,
                GlobalMessageService,
                CdcJsService,
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCForgotPasswordModule {}
