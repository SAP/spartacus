/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { MyAccountV2CustomerTicketingComponent } from './my-account-v2-customer-ticketing.component';

@NgModule({
  exports: [MyAccountV2CustomerTicketingComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyAccountViewRequestsComponent: {
          component: MyAccountV2CustomerTicketingComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SpinnerModule,
    RouterModule,
    MyAccountV2CustomerTicketingComponent,
  ],
})
export class MyAccountV2CustomerTicketingModule {}
