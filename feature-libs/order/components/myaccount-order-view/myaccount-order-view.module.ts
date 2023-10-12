/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { MyAccountOrderViewComponent } from './myaccount-order-view.component';

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
  declarations: [MyAccountOrderViewComponent],
  exports: [MyAccountOrderViewComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewOrderComponent: {
          component: MyAccountOrderViewComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class MyAccountOrderViewModule {}
