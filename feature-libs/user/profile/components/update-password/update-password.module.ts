/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@commerce-storefront-toolset/core';
import {
  FormErrorsModule,
  SpinnerModule,
  PasswordVisibilityToggleModule,
} from '@commerce-storefront-toolset/storefront';
import { UserPasswordFacade } from '@commerce-storefront-toolset/user/profile/root';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';

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
              deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [UpdatePasswordComponent],
})
export class UpdatePasswordModule {}
