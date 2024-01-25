/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
} from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UpdateEmailComponentService } from './update-email-component.service';
import { UpdateEmailComponent } from './update-email.component';

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
  ],
  declarations: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
