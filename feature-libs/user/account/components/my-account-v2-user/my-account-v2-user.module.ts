/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { MyAccountV2UserComponent } from './my-account-v2-user.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewUserComponent: {
          component: MyAccountV2UserComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [MyAccountV2UserComponent],
  exports: [MyAccountV2UserComponent],
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
})
export class MyAccountV2UserModule {}
