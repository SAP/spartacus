/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { IconModule } from '../../misc/icon/icon.module';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationComponent } from './navigation.component';
import { MyaccountNavigationUIComponent } from './myaccount-navigation-ui.componen';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    GenericLinkModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NavigationComponent: {
          component: NavigationComponent,
        },
      },
    }),
  ],
  declarations: [NavigationComponent, NavigationUIComponent, MyaccountNavigationUIComponent],
  exports: [NavigationComponent, NavigationUIComponent ,MyaccountNavigationUIComponent],
})
export class NavigationModule {}
