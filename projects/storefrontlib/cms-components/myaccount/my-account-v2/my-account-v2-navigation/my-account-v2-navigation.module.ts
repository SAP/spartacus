/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountV2NavigationComponent } from './my-account-v2-navigation.component';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { NavigationModule } from '../../../navigation/navigation/navigation.module';

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
