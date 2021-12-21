import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  ORDER_ENTRIES_CONTEXT,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { defaultQuickOrderConfig } from './config/default-quick-order.config';
import {
  CART_QUICK_ORDER_CORE_FEATURE,
  CART_QUICK_ORDER_FEATURE,
} from './feature-name';
import { QuickOrderOrderEntriesContext } from './pages/quick-order-order-entries-context';

export function defaultQuickOrderComponentsConfig() {
  const config = {
    featureModules: {
      [CART_QUICK_ORDER_FEATURE]: {
        cmsComponents: ['QuickOrderComponent', 'CartQuickOrderFormComponent'],
      },
      // by default core is bundled together with components
      [CART_QUICK_ORDER_CORE_FEATURE]: CART_QUICK_ORDER_FEATURE,
    },
  };
  return config;
}

export const defaultQuickOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quickOrder: {
        paths: ['my-account/quick-order'],
      },
    },
  },
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'quickOrder',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: QuickOrderOrderEntriesContext,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
    provideDefaultConfig(defaultQuickOrderRoutingConfig),
    provideDefaultConfig(defaultQuickOrderConfig),
  ],
})
export class QuickOrderRootModule {}
