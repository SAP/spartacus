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
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  PasswordVisibilityToggleModule,
  MessageComponentModule,
} from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { MyAccountV2EmailComponentService } from './my-account-v2-email-component.service';
import { MyAccountV2EmailComponent } from './my-account-v2-email.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountV2EmailComponent: {
          component: MyAccountV2EmailComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: MyAccountV2EmailComponentService,
              useClass: MyAccountV2EmailComponentService,
              deps: [
                UserEmailFacade,
                RoutingService,
                GlobalMessageService,
                AuthService,
                AuthRedirectService,
              ],
            },
          ],
        },
      },
    }),
  ],
  declarations: [MyAccountV2EmailComponent],
  exports: [MyAccountV2EmailComponent],
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
    MessageComponentModule,
  ],
})
export class MyAccountV2EmailModule {}
