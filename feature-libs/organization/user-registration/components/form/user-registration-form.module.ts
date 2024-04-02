/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
  NotAuthGuard,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { UserRegistrationFormComponent } from './user-registration-form.component';
import { UserRegistrationFormService } from './user-registration-form.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
    NgSelectModule,
    NgSelectA11yModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrganizationUserRegistrationComponent: {
          component: UserRegistrationFormComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [UserRegistrationFormComponent],
  exports: [UserRegistrationFormComponent],
  providers: [UserRegistrationFormService],
})
export class UserRegistrationFormModule {}
