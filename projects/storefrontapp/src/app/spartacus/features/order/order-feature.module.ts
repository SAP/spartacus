/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  orderTranslationChunksConfig,
  orderTranslations,
} from '@commerce-storefront-toolset/order/assets';
import { OrderRootModule, ORDER_FEATURE } from '@commerce-storefront-toolset/order/root';

@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@commerce-storefront-toolset/order').then((m) => m.OrderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: orderTranslations,
        chunks: orderTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class OrderFeatureModule {}
