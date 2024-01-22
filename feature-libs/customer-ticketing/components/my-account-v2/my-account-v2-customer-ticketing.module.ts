/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { MyAccountV2CustomerTicketingComponent } from './my-account-v2-customer-ticketing.component';

@NgModule({
  declarations: [MyAccountV2CustomerTicketingComponent],
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
  imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule],
})
export class MyAccountV2CustomerTicketingModule {}
