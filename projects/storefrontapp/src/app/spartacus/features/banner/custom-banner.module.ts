/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CustomBannerComponent } from './custom-banner.component';
import { BannerModule } from '@spartacus/storefront';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [BannerModule],
  declarations: [CustomBannerComponent],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          component: CustomBannerComponent,
        },
      },
    }),
  ],
})
export class CustomBannerModule {}
