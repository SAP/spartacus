/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdpMyAccountModule } from './cdp-my-account';
import { CdpMyAccountSideNavigationModule } from './cdp-my-account-side-navigation/cdp-my-account-side-navigation.module';
import { OrderModule } from './cdp-order/cdp-order.module';
import { CdpMyAccountRequestsModule } from './cdp-my-account-requests/cdp-my-account-requests.module';
import { CdpMyAccountNameModule } from './cdp-my-account-name';
import { CdpBannerModule } from './cdp-banner';

@NgModule({
  imports: [
    CommonModule,
    CdpMyAccountModule,
    CdpMyAccountSideNavigationModule,
    OrderModule,
  ],
  exports: [
    CommonModule,
    CdpMyAccountModule,
    CdpMyAccountSideNavigationModule,
    CdpMyAccountRequestsModule,
    CdpMyAccountNameModule,
    CdpBannerModule,
  ],
})
export class CdpComponentsModule {}
