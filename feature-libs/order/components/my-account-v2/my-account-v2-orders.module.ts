/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  UrlModule,
  I18nModule,
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { MyAccountV2OrdersComponent } from './my-account-v2-orders.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerModule,
    UrlModule,
    I18nModule,
    MediaModule,
  ],
  declarations: [MyAccountV2OrdersComponent],
  exports: [MyAccountV2OrdersComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewOrderComponent: {
          component: MyAccountV2OrdersComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class MyAccountV2OrdersModule {}
