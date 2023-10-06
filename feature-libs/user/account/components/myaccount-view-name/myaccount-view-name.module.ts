/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountViewNameComponent } from './myaccount-view-name.component';
import {
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewNameComponent: {
          component: MyaccountViewNameComponent,
        },
      },
    }),
  ],
  declarations: [MyaccountViewNameComponent],
  exports: [MyaccountViewNameComponent],
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
})
export class MyaccountViewNameModule {}
