/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { UpdateProfileComponent } from './update-profile.component';
import { USE_MY_ACCOUNT_V2_PROFILE } from './use-my-account-v2-profile';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { MyAccountV2ProfileComponent } from './my-account-v2-profile.component';

const myAccountV2ProfileMapping: CmsConfig = {
  cmsComponents: {
    UpdateProfileComponent: {
      component: MyAccountV2ProfileComponent,
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
    RouterModule,
    UrlModule,
    NgSelectModule,
    NgSelectA11yModule,
  ],
  declarations: [UpdateProfileComponent, MyAccountV2ProfileComponent],
  exports: [UpdateProfileComponent, MyAccountV2ProfileComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: UpdateProfileComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdateProfileComponentService,
              useClass: UpdateProfileComponentService,
              deps: [UserProfileFacade, GlobalMessageService],
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_PROFILE) ? myAccountV2ProfileMapping : {}
    ),
  ],
})
export class UpdateProfileModule {}
