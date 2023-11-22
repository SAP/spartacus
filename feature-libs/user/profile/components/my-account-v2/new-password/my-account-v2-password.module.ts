/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  RoutingService,
  UrlModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  FormErrorsModule,
  MessageComponentModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { USE_MY_ACCOUNT_V2_USER, UserPasswordFacade } from '@spartacus/user/profile/root';
import { MyAccountV2PasswordComponent } from './my-account-v2-password.component';
import { MyAccountV2PasswordComponentService } from './my-account-v2-password-component.service';

const myAccountV2CmsMapping: CmsConfig = {
  cmsComponents: {
    MyAccountV2PasswordComponent: {
      component: MyAccountV2PasswordComponent,
      //guards: inherited from standard config,
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
    MyAccountV2PasswordComponentService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountV2PasswordComponent: {
          component: MyAccountV2PasswordComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: MyAccountV2PasswordComponentService,
              useClass: MyAccountV2PasswordComponentService,
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
      inject(USE_MY_ACCOUNT_V2_USER) ? myAccountV2CmsMapping : {}
    ),
  ],
  declarations: [MyAccountV2PasswordComponent],
  exports: [MyAccountV2PasswordComponent],
})
export class MyAccountV2PasswordModule {}
