import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCartConfig } from './config/default-cart-config';
import { defaultCartRoutingConfig } from './config/default-cart-routing-config';
import { ORDER_ENTRIES_CONTEXT } from './context/order-entires.context';
import { CART_CORE_FEATURE, CART_FEATURE, MINI_CART } from './feature-name';
import { ActiveCartOrderEntriesContextToken } from './tokens/context';

export function defaultCartComponentsConfig() {
  const config = {
    featureModules: {
      [CART_FEATURE]: {
        cmsComponents: [
          'ProductAddToCartComponent',
          'CartApplyCouponComponent',
          'CartComponent',
          'CartTotalsComponent',
          'SaveForLaterComponent',
        ],
      },
      [MINI_CART]: {
        cmsComponents: ['MiniCartComponent'],
      },
      // by default core is bundled together with components
      [CART_CORE_FEATURE]: CART_FEATURE,
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
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'cart',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultCartComponentsConfig),
    provideDefaultConfig(defaultCartConfig),
    provideDefaultConfig(defaultCartRoutingConfig),
  ],
})
export class CartRootModule {}
