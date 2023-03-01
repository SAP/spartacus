/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, NgModule } from '@angular/core';
import {
  cartBaseTranslationChunksConfig,
  cartBaseTranslations,
} from '@spartacus/cart/base/assets';
import {
  ADD_TO_CART_FEATURE,
  CartBaseRootModule,
  CartChangeEvent,
  CART_BASE_FEATURE,
  MINI_CART_FEATURE,
} from '@spartacus/cart/base/root';
import { EventService, provideConfig } from '@spartacus/core';

/**
 * DELETE ME
 *
 * Development class for listening to new change event
 */
@Injectable()
class ChangeCartListener {
  constructor(service: EventService) {
    service.get(CartChangeEvent).subscribe((x) => {
      console.log('CartChangeEvent event emitted', x);
    });
  }
}

@NgModule({
  imports: [CartBaseRootModule],
  providers: [
    ChangeCartListener,
    provideConfig({
      featureModules: {
        [CART_BASE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base').then((m) => m.CartBaseModule),
        },
      },
    }),
    provideConfig({
      featureModules: {
        [MINI_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/mini-cart').then(
              (m) => m.MiniCartModule
            ),
        },
      },
    }),
    provideConfig({
      featureModules: {
        [ADD_TO_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/add-to-cart').then(
              (m) => m.AddToCartModule
            ),
        },
      },
    }),
    provideConfig({
      i18n: {
        resources: cartBaseTranslations,
        chunks: cartBaseTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartBaseFeatureModule {
  constructor(changeCartListener: ChangeCartListener) {
    console.log('eager instantiation', this, '->', changeCartListener);
  }
}
