/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  BtnLikeLinkModule,
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
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
    FeaturesConfigModule,
    BtnLikeLinkModule,
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    ForgotPasswordComponent,
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
})
export class ForgotPasswordModule {}
