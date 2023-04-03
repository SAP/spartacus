/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nModule,
  UrlModule,
  FeaturesConfigModule,
  CmsConfig,
  ConfigModule,
} from '@spartacus/core';
import {
  SpinnerModule,
  FormErrorsModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { CDPUpdateProfileComponent } from './cdp-update-profile.component';
import { CDPUpdateProfileService } from './cdp-update-profile.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    RouterModule,
    UrlModule,
    NgSelectModule,
    NgSelectA11yModule,
    FeaturesConfigModule,
    PasswordVisibilityToggleModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: CDPUpdateProfileComponent,
        },
      },
    }),
  ],
  providers: [CDPUpdateProfileService],
  declarations: [CDPUpdateProfileComponent],
  exports: [CDPUpdateProfileComponent],
})
export class CDPUpdateProfileModule {}
