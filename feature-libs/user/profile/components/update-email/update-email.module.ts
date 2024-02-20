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
  SpinnerModule,
  PasswordVisibilityToggleModule,
  MessageComponentModule,
} from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UpdateEmailComponentService } from './update-email-component.service';
import { UpdateEmailComponent } from './update-email.component';

import { USE_MY_ACCOUNT_V2_EMAIL } from './use-my-account-v2-email.ts';
import { MyAccountV2EmailComponent } from './my-account-v2-email.component';

const myAccountV2EmailMapping: CmsConfig = {
  cmsComponents: {
    UpdateEmailComponent: {
      component: MyAccountV2EmailComponent,
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
    MessageComponentModule,
  ],
  declarations: [UpdateEmailComponent, MyAccountV2EmailComponent],
  exports: [UpdateEmailComponent, MyAccountV2EmailComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdateEmailComponent: {
          component: UpdateEmailComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdateEmailComponentService,
              useClass: UpdateEmailComponentService,
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
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_EMAIL) ? myAccountV2EmailMapping : {}
    ),
  ],
})
export class UpdateEmailModule {}
