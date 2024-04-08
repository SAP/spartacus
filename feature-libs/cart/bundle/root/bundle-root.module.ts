/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { ProductVariantStyleIconsComponent } from '@spartacus/product/variants/root';
import { CmsPageGuard, OutletPosition, PageLayoutComponent, provideOutlet } from '@spartacus/storefront';
import { BundleProductListOutlets } from '../components/bundle-main/bundle-outlets.model';
import { BundleSelectProductComponent } from '../components/bundle-main/components/bundle-select-product/bundle-select-product.component';
import { BUNDLE_FEATURE } from '../core';
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
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideOutlet({
      id: BundleProductListOutlets.ITEM_ACTIONS,
      position: OutletPosition.AFTER,
      component: BundleSelectProductComponent,
    }),
    provideOutlet({
      id: BundleProductListOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ProductVariantStyleIconsComponent,
    }),
    provideDefaultConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent', 'ProductVariantStyleIconsComponent', 'BundleAllowedProductListComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
