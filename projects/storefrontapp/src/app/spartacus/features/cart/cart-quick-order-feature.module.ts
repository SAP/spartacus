/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  quickOrderTranslationChunksConfig,
  quickOrderTranslationsEn,
  quickOrderTranslationsJa,
  quickOrderTranslationsDe,
  quickOrderTranslationsZh,
} from '@spartacus/cart/quick-order/assets';
import {
  CART_QUICK_ORDER_FEATURE,
  QuickOrderRootModule,
} from '@spartacus/cart/quick-order/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [QuickOrderRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_QUICK_ORDER_FEATURE]: {
          module: () =>
            import('@spartacus/cart/quick-order').then(
              (m) => m.QuickOrderModule
            ),
        },
      },
      i18n: {
        resources: {
          en: quickOrderTranslationsEn,
          ja: quickOrderTranslationsJa,
          de: quickOrderTranslationsDe,
          zh: quickOrderTranslationsZh,
        },
        chunks: quickOrderTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartQuickOrderFeatureModule {}
