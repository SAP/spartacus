/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
// import { CdpMyAccountComponent } from '@spartacus/cdp/root/components';
import { SpinnerModule } from '@spartacus/storefront';
import { CdpMyAccountComponent } from './cdp-my-account.component';
import { defaultOrderRoutingConfig } from 'feature-libs/order/root/config/default-order-routing-config';

@NgModule({
  declarations: [CdpMyAccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    UrlModule,
    I18nModule,
    FeaturesConfigModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CdpMyAccountComponent: { component: CdpMyAccountComponent },
      },
    }),
  ],
  providers: [
    provideDefaultConfig(defaultOrderRoutingConfig)
  ],
  exports: [CdpMyAccountComponent],
})
export class CdpMyAccountModule {}
