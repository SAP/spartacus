/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CART_BASE_FEATURE,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/cart/base/root';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import {
  CART_SAVED_CART_CORE_FEATURE,
  CART_SAVED_CART_FEATURE,
} from './feature-name';
import {
  NewSavedCartOrderEntriesContextToken,
  SavedCartOrderEntriesContextToken,
} from './tokens/context';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultCartSavedCartComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CART_SAVED_CART_FEATURE]: {
        cmsComponents: [
          'AddToSavedCartsComponent',
          'AccountSavedCartHistoryComponent',
          'SavedCartDetailsOverviewComponent',
          'SavedCartDetailsItemsComponent',
          'SavedCartDetailsActionComponent',
        ],
        dependencies: [CART_BASE_FEATURE],
      },

      // by default core is bundled together with components
      [CART_SAVED_CART_CORE_FEATURE]: CART_SAVED_CART_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'savedCartsDetails',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
          },
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'savedCarts',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: NewSavedCartOrderEntriesContextToken,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          savedCarts: {
            paths: ['my-account/saved-carts'],
          },
          savedCartsDetails: {
            paths: ['my-account/saved-cart/:savedCartId'],
            paramsMapping: { savedCartId: 'savedCartId' },
          },
        },
      },
    }),
  ],
})
export class SavedCartRootModule {}
