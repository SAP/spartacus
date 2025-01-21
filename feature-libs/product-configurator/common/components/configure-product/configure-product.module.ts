/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  BtnLikeLinkModule,
  IconModule,
  OutletPosition,
  ProductListOutlets,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfigureProductComponent } from './configure-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConfigureProductComponent: {
          component: ConfigureProductComponent,
        },
      },
    }),
    UrlModule,
    I18nModule,
    IconModule,
    FeaturesConfigModule,
    BtnLikeLinkModule,
  ],
  providers: [
    provideOutlet({
      id: ProductListOutlets.ITEM_ACTIONS,
      position: OutletPosition.AFTER,
      component: ConfigureProductComponent,
    }),
  ],
  declarations: [ConfigureProductComponent],
  exports: [ConfigureProductComponent],
})
export class ConfigureProductModule {}
