/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { UserMyAccountViewComponent } from './user-myaccount-view.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewNameComponent: {
          component: UserMyAccountViewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [UserMyAccountViewComponent],
  exports: [UserMyAccountViewComponent],
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
})
export class UserMyaccountViewModule {}
