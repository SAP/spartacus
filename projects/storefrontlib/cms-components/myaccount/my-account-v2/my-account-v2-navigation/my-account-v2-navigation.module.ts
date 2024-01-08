/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { NavigationModule } from '../../../navigation/navigation/navigation.module';
import { MyAccountV2NavigationComponent } from './my-account-v2-navigation.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountSideNavigationComponent: {
          component: MyAccountV2NavigationComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [MyAccountV2NavigationComponent],
  exports: [MyAccountV2NavigationComponent],
  imports: [CommonModule, NavigationModule, I18nModule],
})
export class MyAccountV2NavigationModule {}
