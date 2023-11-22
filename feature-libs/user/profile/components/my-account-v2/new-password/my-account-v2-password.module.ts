/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
} from '@spartacus/core';
import {
  FormErrorsModule,
  MessageComponentModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { MyAccountV2PasswordComponentService } from './my-account-v2-password-component.service';
import { MyAccountV2PasswordComponent } from './my-account-v2-password.component';

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
  ],
  declarations: [MyAccountV2PasswordComponent],
  exports: [MyAccountV2PasswordComponent],
})
export class MyAccountV2PasswordModule {}
