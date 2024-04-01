/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { BUNDLE_FEATURE, BundleService } from '../core';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';

@NgModule({
  imports: [
    RouterModule.forChild([{
      // @ts-ignore
      path: null,
      canActivate: [CmsPageGuard],
      component: PageLayoutComponent,
      data: { cxRoute: 'bundleSearch' },
    }])
  ],
  declarations: [],
  providers: [
    BundleService,
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent', 'CartTotalsComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
