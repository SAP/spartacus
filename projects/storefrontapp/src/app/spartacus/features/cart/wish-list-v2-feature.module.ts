/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CART_WISH_LIST_FEATURE } from '@spartacus/cart/wish-list/root';
import { provideConfig } from '@spartacus/core';
import { WishListFeatureModule } from './wish-list-feature.module';

@NgModule({
  imports: [WishListFeatureModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list').then(
              (m) => m.WishListWithV2Module
            ),
        },
      },
    }),
  ],
})
export class WishListV2FeatureModule {}
