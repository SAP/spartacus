/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  quickOrderTranslationChunksConfig,
  quickOrderTranslations,
} from '@commerce-storefront-toolset/cart/quick-order/assets';
import {
  CART_QUICK_ORDER_FEATURE,
  QuickOrderRootModule,
} from '@commerce-storefront-toolset/cart/quick-order/root';
import { provideConfig } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [QuickOrderRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_QUICK_ORDER_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/cart/quick-order').then(
              (m) => m.QuickOrderModule
            ),
        },
      },
      i18n: {
        resources: quickOrderTranslations,
        chunks: quickOrderTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class QuickOrderFeatureModule {}
