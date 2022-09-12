/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthConfigService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@commerce-storefront-toolset/core';
import { FormErrorsModule, SpinnerModule } from '@commerce-storefront-toolset/storefront';
import { UserPasswordFacade } from '@commerce-storefront-toolset/user/profile/root';
import { ForgotPasswordComponentService } from './forgot-password-component.service';
import { ForgotPasswordComponent } from './forgot-password.component';

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
          guards: [NotAuthGuard],
          providers: [
            {
              provide: ForgotPasswordComponentService,
              useClass: ForgotPasswordComponentService,
              deps: [
                UserPasswordFacade,
                RoutingService,
                AuthConfigService,
                GlobalMessageService,
              ],
            },
          ],
        },
      },
    }),
  ],
  declarations: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
