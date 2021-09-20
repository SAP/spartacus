import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
import {
  quickOrderTranslationChunksConfig,
  quickOrderTranslations,
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
          dependencies: [CART_FEATURE],
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
