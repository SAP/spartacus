/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  AuthRedirectService,
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  MessageComponentModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';

import { USE_MY_ACCOUNT_V2_PASSWORD } from './use-my-account-v2-password';
import { MyAccountV2PasswordComponent } from './my-account-v2-password.component';

const myAccountV2PasswordMapping: CmsConfig = {
  cmsComponents: {
    UpdatePasswordComponent: {
      component: MyAccountV2PasswordComponent,
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
    MessageComponentModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdatePasswordComponentService,
              useClass: UpdatePasswordComponentService,
              deps: [
                UserPasswordFacade,
                RoutingService,
                GlobalMessageService,
                AuthRedirectService,
                AuthService,
              ],
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_PASSWORD) ? myAccountV2PasswordMapping : {}
    ),
  ],
  declarations: [UpdatePasswordComponent, MyAccountV2PasswordComponent],
  exports: [UpdatePasswordComponent, MyAccountV2PasswordComponent],
})
export class UpdatePasswordModule {}
