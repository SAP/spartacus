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
import { CdpBannerComponent } from './cdp-banner.component';
import { defaultOrderRoutingConfig } from 'feature-libs/order/root/config/default-order-routing-config';
// import { CdpMyAccountComponent } from '../cdp-my-account';

@NgModule({
  declarations: [CdpBannerComponent],
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
        CdpBannerComponent: { component: CdpBannerComponent },
      },
    }),
  ],
  providers: [
    provideDefaultConfig(defaultOrderRoutingConfig)
  ],
  exports: [CdpBannerComponent],
})
export class CdpBannerModule {}
