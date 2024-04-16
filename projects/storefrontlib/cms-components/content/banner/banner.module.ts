/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { CxBannerComponent } from './banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GenericLinkModule,
    MediaModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SimpleResponsiveBannerComponent: {
          component: CxBannerComponent,
        },
        BannerComponent: {
          component: CxBannerComponent,
        },
        SimpleBannerComponent: {
          component: CxBannerComponent,
        },
      },
    }),
  ],
  declarations: [CxBannerComponent],
  exports: [CxBannerComponent],
})
export class BannerModule {}
