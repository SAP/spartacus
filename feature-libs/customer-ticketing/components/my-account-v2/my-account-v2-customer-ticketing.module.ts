/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  CmsConfig,
  AuthGuard,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { MyAccountV2CustomerTicketingComponent } from './my-account-v2-customer-ticketing.component';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
