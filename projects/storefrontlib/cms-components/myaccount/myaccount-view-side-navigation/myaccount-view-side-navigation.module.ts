/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountViewSideNavigationComponent } from './myaccount-view-side-navigation.component';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { NavigationModule } from '../../navigation/navigation/navigation.module';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountSideNavigationComponent: {
          component: MyaccountViewSideNavigationComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [MyaccountViewSideNavigationComponent],
  exports: [MyaccountViewSideNavigationComponent],
  imports: [CommonModule, NavigationModule, I18nModule],
})
export class MyaccountViewSideNavigationModule {}
